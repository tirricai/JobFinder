import { Navigate, Route, Routes } from "react-router-dom";

// COMPONENTES
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// PAGINAS
import Applications from "./pages/Applications";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetails";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Saved from "./pages/Saved";

// HOOK
import { useAppLogic } from "./hooks/useAppLogic";

export default function App() {
  const {
    user,
    jobs,
    savedJobIds,
    isLoading,
    darkMode,
    searchTerm,
    setSearchTerm,
    setDarkMode,
    navigate,
    handleLogin,
    handleLogout,
    handleExecuteSearch,
    handleToggleSave,
    setUser,
  } = useAppLogic();

  const savedJobsList = user?.savedJobs || [];

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-300 
      ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {user && (
        <Navbar
          onSearch={setSearchTerm}
          onTriggerSearch={handleExecuteSearch}
          onGoHome={() => navigate("/")}
          onLogout={handleLogout}
          toggleTheme={() => setDarkMode(!darkMode)}
          isDark={darkMode}
        />
      )}

      <div className="flex flex-1 overflow-hidden">
        {user && (
          <Sidebar
            onViewChange={(view) => {
              if (view === "home") navigate("/");
              if (view === "profile") navigate("/profile");
              if (view === "saved") navigate("/saved");
              if (view === "applications") navigate("/applications");
            }}
            user={user}
            isDark={darkMode}
          />
        )}

        <main className={`flex-1 overflow-y-auto ${user ? "p-8" : "p-0"}`}>
          <Routes>
            <Route
              path="/login"
              element={
                !user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
              }
            />

            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />

            <Route
              path="/"
              element={
                user ? (
                  isLoading ? (
                    <div className="text-center py-20 animate-pulse">
                      Cargando...
                    </div>
                  ) : (
                    <Home
                      jobs={jobs}
                      searchTerm={searchTerm}
                      savedJobIds={savedJobIds}
                      onToggleSave={handleToggleSave}
                      isDark={darkMode}
                    />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/profile"
              element={
                user ? (
                  <Profile
                    initialUser={user}
                    onUserUpdate={setUser}
                    isDark={darkMode}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/saved"
              element={
                user ? (
                  <Saved
                    savedJobs={savedJobsList}
                    onToggleSave={handleToggleSave}
                    isDark={darkMode}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/job/:id"
              element={
                user ? (
                  <JobDetail
                    isDark={darkMode}
                    savedJobIds={savedJobIds}
                    onToggleSave={handleToggleSave}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/applications"
              element={
                user ? (
                  <Applications isDark={darkMode} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
