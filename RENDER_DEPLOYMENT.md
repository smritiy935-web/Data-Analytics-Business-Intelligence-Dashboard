# 🚀 Deploying to Render: Backend Setup Guide

Follow these steps to deploy your Node.js backend to Render.

## 1. Prepare your Repository
Ensure your `server` directory has its own `package.json` and `server.js` (which we just optimized).

## 2. Create a New Web Service on Render
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub/GitLab repository.
4. Set the following configurations:
   * **Name:** `bi-dashboard-api` (or your preferred name)
   * **Root Directory:** `server` (This is crucial if your backend is in a subdirectory)
   * **Environment:** `Node`
   * **Build Command:** `npm install`
   * **Start Command:** `node server.js` (or `npm start`)

## 3. Configure Environment Variables
In the Render dashboard, go to the **Environment** tab of your service and add these keys:

| Key | Value | Note |
|-----|-------|------|
| `PORT` | `10000` | Render usually sets this automatically, but you can specify it. |
| `NODE_ENV` | `production` | Set to production. |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Connection String. |
| `JWT_SECRET` | `your_secret_key` | A long random string. |
| `FRONTEND_URL` | `https://your-frontend.netlify.app` | **CRITICAL:** Use your actual deployed frontend URL. |

## 4. Frontend Integration
On your frontend deployment (Netlify/Vercel), make sure to add this environment variable:
* `VITE_API_URL`: `https://bi-dashboard-api.onrender.com/api`

## 5. Why the original code failed on Render:
1. **Hardcoded Ports/URLs:** Using `localhost` in production causes connection refused errors.
2. **CORS Policy:** Render services have different origins. If `FRONTEND_URL` is not correctly configured in CORS, the browser blocks the request.
3. **Socket.io Transports:** Default Socket.io sometimes fails on cloud providers. We added `transports: ['websocket', 'polling']` for better compatibility.
4. **Environment Variables:** Render requires specific variables to bind the port and connect to external databases securely.
5. **No Health Check:** Deployment platforms like Render use health checks to verify if the server is alive. We added `/health` route.

## 6. Common Troubleshooting
* **Error: "Connection Refused":** Check if `FRONTEND_URL` in backend matches your frontend's actual URL (no trailing slash).
* **Error: "CORS Error":** Ensure you've added the environment variables on Render and restarted the service.
* **Socket issues:** Ensure the frontend socket client points to the Render URL, not localhost.
