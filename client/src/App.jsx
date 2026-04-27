import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Chatbot from "./components/Chatbot";
import { FilterProvider } from "./context/FilterContext";
import CommandPalette from "./components/dashboard/CommandPalette";
import AdminLayout from "./components/admin/AdminLayout";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/" />;

  return children;
};

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto px-2 pb-2 lg:px-3 lg:pb-3">
          {children}
        </main>
      </div>
      <Chatbot />
      <CommandPalette />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FilterProvider>
          <Router
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Upload />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout>
                      <Routes>
                        <Route path="/" element={<Admin />} />
                        <Route path="/users" element={<Admin />} />
                        <Route
                          path="/data"
                          element={
                            <div className="p-8 text-center text-slate-500">
                              Data Pipeline Management Under Construction
                            </div>
                          }
                        />
                        <Route
                          path="/logs"
                          element={
                            <div className="p-8 text-center text-slate-500">
                              System Logs Node Under Construction
                            </div>
                          }
                        />
                        <Route
                          path="/stats"
                          element={
                            <div className="p-8 text-center text-slate-500">
                              Advanced Analytics Under Construction
                            </div>
                          }
                        />
                        <Route
                          path="/settings"
                          element={
                            <div className="p-8 text-center text-slate-500">
                              Global System Settings Under Construction
                            </div>
                          }
                        />
                      </Routes>
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Analytics />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Settings />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </FilterProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
