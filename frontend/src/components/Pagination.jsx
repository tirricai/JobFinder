export default function Pagination({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  isDark,
}) {
  const btnClass = `px-4 py-2 rounded-lg border font-medium transition-all duration-200 
    ${
      isDark
        ? "bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600"
        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400"
    }`;

  return (
    <div className="flex justify-center items-center gap-4 mt-10">
      {/* Anterior */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={btnClass}
      >
        ← Anterior
      </button>

      {/* "Texto intermedio */}
      <span
        className={`text-sm font-medium ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Página {currentPage} de {totalPages}
      </span>

      {/* Siguiente */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={btnClass}
      >
        Siguiente →
      </button>
    </div>
  );
}
