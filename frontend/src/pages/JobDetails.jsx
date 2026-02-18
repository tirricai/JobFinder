import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getJobById } from "../services/jobService";

export default function JobDetail({ isDark, onToggleSave, savedJobIds = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Intentamos obtener datos pasados por el Link (si existen)
  const initialJobData = location.state?.jobData || null;

  const [job, setJob] = useState(initialJobData);
  const [loading, setLoading] = useState(!initialJobData);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        if (data) {
          setJob(data);
        }
      } catch (error) {
        console.warn(
          "El trabajo no está en BD, mostrando datos locales.",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = () => {
    if (!job) return;

    Swal.fire({
      title: "¡Postulación Enviada!",
      text: `Has aplicado a la posición de ${job.title} en ${job.company}.`,
      icon: "success",
      confirmButtonColor: "#2563EB",
      background: isDark ? "#1f2937" : "#fff",
      color: isDark ? "#fff" : "#545454",
    });
  };

  const isSaved = job && savedJobIds.includes(job.id || job.externalId);

  // --- CLASES VISUALES ---
  const containerClass = `max-w-4xl mx-auto p-6 min-h-screen ${
    isDark ? "text-gray-100" : "text-gray-800"
  }`;

  const cardClass = `rounded-xl p-8 shadow-sm border ${
    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
  }`;

  const tagClass = `px-3 py-1 rounded-full text-sm font-medium border ${
    isDark
      ? "bg-blue-900/30 text-blue-200 border-blue-800"
      : "bg-blue-50 text-blue-700 border-blue-100"
  }`;

  if (loading)
    return (
      <div className="p-10 text-center animate-pulse">Cargando detalles...</div>
    );

  if (!job)
    return <div className="p-10 text-center">Oferta no encontrada 😔</div>;

  return (
    <div className={containerClass}>
      {/* Botón Volver */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 flex items-center gap-2 text-sm font-medium transition-colors ${
          isDark
            ? "text-gray-400 hover:text-white"
            : "text-gray-500 hover:text-black"
        }`}
      >
        ← Volver al listado
      </button>

      <div className={cardClass}>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex items-center gap-2 text-lg">
              <span className="font-semibold text-blue-500">{job.company}</span>
              <span className={isDark ? "text-gray-500" : "text-gray-300"}>
                •
              </span>
              <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                {job.location}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => onToggleSave(job.id || job.externalId)}
              className={`p-3 rounded-lg border transition-all ${
                isSaved
                  ? "bg-blue-100 border-blue-200 text-blue-600"
                  : isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
              }`}
              title={isSaved ? "Quitar de guardados" : "Guardar oferta"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isSaved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>

            <button
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform active:scale-95 transition-all"
            >
              Aplicar Ahora
            </button>
          </div>
        </div>

        <hr
          className={`my-6 ${isDark ? "border-gray-700" : "border-gray-100"}`}
        />

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Descripción del puesto</h3>
          <p
            className={`leading-relaxed whitespace-pre-line ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {job.description || "No hay descripción disponible."}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Requisitos y Tecnologías
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.skills && job.skills.length > 0 ? (
              job.skills.map((skill, i) => (
                <span key={i} className={tagClass}>
                  {skill}
                </span>
              ))
            ) : (
              <span
                className={`text-sm italic ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                Sin etiquetas especificadas
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
