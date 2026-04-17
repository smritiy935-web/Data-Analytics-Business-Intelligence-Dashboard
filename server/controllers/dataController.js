const Data = require('../models/Data');
const Papa = require('papaparse');
const fs = require('fs');

const uploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const isCSV = req.file.originalname.toLowerCase().endsWith('.csv');
  
  // Directly accept non-CSV documents without parsing the text as CSV
  if (!isCSV) {
    if (req.io) {
      req.io.emit('dataUpdated', { message: 'New document uploaded', count: 0 });
    }
    return res.status(201).json({ message: 'Document uploaded successfully for processing', count: 0 });
  }

  const fileContent = req.file.buffer.toString('utf8');

  Papa.parse(fileContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: async (results) => {
      try {
        const userId = req.user._id;
        const dataToSave = results.data.map((row) => {
          let cleanValue = row.Value || row.value || row.Amount || row.amount || 0;
          if (typeof cleanValue === 'string') {
            cleanValue = Number(cleanValue.replace(/[^0-9.-]+/g,""));
          }
          return {
          user: userId,
          category: row.Category || row.category || 'General',
          value: isNaN(cleanValue) ? 0 : cleanValue,
          label: row.Label || row.label || row.Name || row.name || 'Untitled',
          date: row.Date || row.date || new Date(),
          type: row.Type || row.type || 'sales',
          metadata: row,
        };
        });

        const savedData = await Data.insertMany(dataToSave);
        
        // Notify via Socket.io (io will be attached to req in server.js)
        if (req.io) {
          req.io.emit('dataUpdated', { message: 'New data uploaded', count: savedData.length });
        }

        res.status(201).json({ message: 'Data uploaded successfully', count: savedData.length });
      } catch (error) {
        res.status(500).json({ message: 'Error saving data', error: error.message });
      }
    },
    error: (error) => {
      res.status(400).json({ message: 'Error parsing CSV', error: error.message });
    },
  });
};

const getData = async (req, res) => {
  try {
    const { category, startDate, endDate, search, page = 1, limit = 100 } = req.query;
    let query = {};

    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (search) {
      query.label = { $regex: search, $options: 'i' };
    }

    const data = await Data.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Data.countDocuments(query);

    res.json({
      data,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalEntries: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

const deleteData = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Data not found' });

    if (data.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await data.deleteOne();
    res.json({ message: 'Data removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';
    const match = isAdmin ? {} : { user: userId };

    const stats = await Data.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$value' },
          totalEntries: { $sum: 1 },
          avgValue: { $avg: '$value' },
        },
      },
    ]);

    const categoryStats = await Data.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$value' },
          count: { $sum: 1 },
        },
      },
    ]);

    const timeStats = await Data.aggregate([
      { $match: match },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          total: { $sum: '$value' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      summary: stats[0] || { totalSales: 0, totalEntries: 0, avgValue: 0 },
      categoryStats,
      timeStats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};

module.exports = { uploadCSV, getData, deleteData, getStats };
