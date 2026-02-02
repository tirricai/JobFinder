export default function Sidebar({ onViewChange, user, isDark }) {
  const bgClass = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";
  const textMain = isDark ? "text-white" : "text-gray-800";
  const textSub = isDark ? "text-gray-400" : "text-gray-500";
  const hoverClass = isDark
    ? "hover:bg-gray-700 hover:text-white"
    : "hover:bg-gray-50 hover:text-blue-600";
  const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  return (
    <aside
      className={`w-64 h-full border-r flex flex-col transition-colors duration-300 ${bgClass}`}
    >
      {/* SECCION DE PERFIL */}
      <div
        className={`p-6 border-b flex flex-col items-center ${
          isDark ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <img
          src={user?.profilePicture || defaultAvatar}
          onError={(e) => (e.target.src = defaultAvatar)}
          alt="Avatar"
          className={`w-20 h-20 rounded-full object-cover mb-3 border-2 ${
            isDark ? "border-gray-600" : "border-blue-100"
          }`}
        />

        <h3 className={`font-bold text-center ${textMain}`}>
          {user ? user.fullName : "Cargando..."}
        </h3>

        <p className={`text-xs font-medium mb-4 text-center ${textSub}`}>
          {user ? user.title : "..."}
        </p>

        <button
          onClick={() => onViewChange("profile")}
          className={`text-xs font-semibold border px-3 py-1 rounded-full transition-colors 
            ${
              isDark
                ? "text-blue-400 border-gray-600 hover:bg-gray-700"
                : "text-blue-600 border-blue-100 bg-blue-50 hover:text-blue-700"
            }`}
        >
          Editar Perfil
        </button>
      </div>

      {/* MENU DE NAVEGACION */}
      <div className="p-4 space-y-4 overflow-y-auto flex-1">
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onViewChange("home")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
              isDark ? "text-gray-300" : "text-gray-700"
            } ${hoverClass}`}
          >
            <span>🏠</span> Inicio
          </button>

          <button
            onClick={() => onViewChange("profile")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
              isDark ? "text-gray-300" : "text-gray-700"
            } ${hoverClass}`}
          >
            <span>👤</span> Mi Perfil
          </button>

          <button
            onClick={() => onViewChange("applications")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
              isDark ? "text-gray-300" : "text-gray-700"
            } ${hoverClass}`}
          >
            <span>💼</span> Mis Aplicaciones
          </button>

          <button
            onClick={() => onViewChange("saved")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
              isDark ? "text-gray-300" : "text-gray-700"
            } ${hoverClass}`}
          >
            <span>🔖</span> Guardados
          </button>

          <button
            onClick={() => alert("Pronto...")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors text-left ${
              isDark ? "text-gray-300" : "text-gray-700"
            } ${hoverClass}`}
          >
            <span>❓</span> Ayuda
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className={`p-4 border-t ${
          isDark ? "border-gray-700" : "border-gray-100"
        }`}
      >
        <p className={`text-xs text-center ${textSub}`}>
          © 2026 JobFinder v1.0
        </p>
      </div>
    </aside>
  );
}
