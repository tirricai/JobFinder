import Logo from "../icons/Icon";
export default function Navbar({
  onSearch,
  onTriggerSearch,
  onGoHome,
  onLogout,
  toggleTheme,
  isDark,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onTriggerSearch();
    }
  };

  return (
    <nav
      className={`h-16 border-b flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-300 
      ${
        isDark
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onGoHome}
      >
        <Logo className="h-10 w-10 rounded-xl" />
        <span
          className={`text-xl font-bold tracking-tight ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          JobFinder
        </span>
      </div>

      {/* Barra de Busqueda */}
      <div className="hidden md:flex flex-1 max-w-lg mx-8">
        <div
          className={`relative w-full focus-within:text-blue-600 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all text-sm
              ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
              }`}
            placeholder="Buscar empleos (Presiona Enter para buscar en web)..."
          />
        </div>
      </div>

      {/* Dark */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${
            isDark
              ? "hover:bg-gray-700 text-yellow-300"
              : "hover:bg-gray-100 text-gray-500"
          }`}
          title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          )}
        </button>

        {/* Separador */}
        <div
          className={`h-6 w-px ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
        ></div>

        {/* Salir */}
        <button
          onClick={onLogout}
          className={`text-sm font-medium transition-colors ${
            isDark
              ? "text-gray-300 hover:text-red-400"
              : "text-gray-500 hover:text-red-600"
          }`}
        >
          Salir
        </button>
      </div>
    </nav>
  );
}
