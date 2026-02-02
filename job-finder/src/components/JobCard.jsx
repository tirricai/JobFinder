import { Link } from "react-router-dom";

export default function JobCard({
  id,
  externalId,
  title,
  company,
  type,
  description,
  match, // Asumimos que es true/false o un número
  isSaved,
  onToggleSave,
  jobUrl,
  isDark,
  onApply,
}) {
  const uniqueId = id || externalId;

  return (
    <div
      className={`group relative rounded-xl shadow-sm p-6 border mb-4 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl
      ${
        isDark
          ? "bg-gray-800 border-gray-700 hover:border-blue-500"
          : "bg-white border-gray-100 hover:border-blue-200"
      }`}
    >
      {/* BADGE DE COMPATIBILIDAD (Corregido) */}
      <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
        {match && (
          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full border border-green-200 shadow-sm flex items-center gap-1">
            ✨ Compatible
          </span>
        )}

        {/* BOTÓN GUARDAR */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(uniqueId);
          }}
          className={`p-1.5 rounded-full border transition-all shadow-sm ${
            isDark
              ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
              : "bg-white/80 border-transparent hover:bg-gray-100 hover:border-gray-200"
          }`}
          title={isSaved ? "Quitar de guardados" : "Guardar oferta"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isSaved ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 ${
              isSaved
                ? "text-red-500"
                : isDark
                  ? "text-gray-400"
                  : "text-gray-400 hover:text-red-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-start mb-2 pr-12">
        <div>
          {/* 👇 AGREGAMOS 'state' AQUÍ 👇 */}
          <Link
            to={`/job/${uniqueId}`}
            state={{
              jobData: {
                id,
                externalId,
                title,
                company,
                type,
                description,
                jobUrl,
              },
            }}
          >
            <h3
              className={`text-lg font-bold group-hover:text-blue-600 transition-colors cursor-pointer hover:underline ${
                isDark ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {title}
            </h3>
          </Link>
          <p className="text-blue-600 font-medium text-sm">{company}</p>
        </div>
      </div>

      {/* TAG DE TIPO */}
      <div className="mb-4">
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${
            isDark
              ? "bg-gray-700 text-gray-300 border-gray-600"
              : "bg-gray-100 text-gray-600 border-gray-200"
          }`}
        >
          {type || "Full Time"}
        </span>
      </div>

      {/* DESCRIPCIÓN */}
      <p
        className={`text-sm mb-4 line-clamp-2 leading-relaxed ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {description}
      </p>

      {/* FOOTER (Separado con justify-between) */}
      <div
        className={`flex justify-between items-center pt-3 border-t mt-4 ${
          isDark ? "border-gray-700" : "border-gray-50"
        }`}
      >
        <Link
          to={`/job/${uniqueId}`}
          state={{
            jobData: {
              id,
              externalId,
              title,
              company,
              type,
              description,
              jobUrl,
            },
          }}
          className="text-blue-500 hover:text-blue-600 hover:underline text-sm font-bold"
        >
          Ver detalle
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onApply) onApply();
          }}
          className={`text-sm font-semibold transition-colors flex items-center gap-1 group-hover:gap-2 px-3 py-1 rounded-lg
            ${jobUrl ? "cursor-pointer" : "cursor-not-allowed opacity-50"} 
            ${
              isDark
                ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
            }
          `}
          disabled={!jobUrl}
        >
          Aplicar ahora <span>→</span>
        </button>
      </div>
    </div>
  );
}
