import { useEffect, useState } from "react";
import { getMyProfile } from "../services/userService";

// IsDark
export default function Applications({ isDark }) {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const user = await getMyProfile(userId);
          if (user && user.appliedJobs) {
            setAppliedJobs([...user.appliedJobs].reverse());
          }
        } catch (error) {
          console.error("Error cargando postulaciones:", error);
        }
      }
      setLoading(false);
    };
    fetchApplications();
  }, []);

  if (loading)
    return (
      <div
        className={`p-8 text-center ${
          isDark ? "text-gray-400" : "text-gray-500"
        }`}
      >
        Cargando postulaciones...
      </div>
    );

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in-up">
      <h2
        className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        🚀 Mis Postulaciones ({appliedJobs.length})
      </h2>

      {appliedJobs.length === 0 ? (
        <div
          className={`text-center p-10 rounded-xl border border-dashed shadow-sm ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"
          }`}
        >
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-500"}`}
          >
            Aún no te has postulado a ninguna oferta.
          </p>
          <p
            className={`text-sm mt-2 ${
              isDark ? "text-gray-500" : "text-gray-400"
            }`}
          >
            ¡Ve al inicio y empieza a buscar!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {appliedJobs.map((job) => {
            const link = job.jobUrl || job.url;

            return (
              <div
                key={job.id}
                className={`p-6 rounded-xl shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-100 hover:shadow-md"
                }`}
              >
                {/* Info del Trabajo */}
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      isDark ? "text-gray-100" : "text-gray-800"
                    }`}
                  >
                    {job.title}
                  </h3>
                  <div
                    className={`flex items-center gap-2 mt-1 ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <span className="font-medium">🏢 {job.company}</span>
                    <span
                      className={isDark ? "text-gray-600" : "text-gray-300"}
                    >
                      •
                    </span>
                    <span className="text-sm">{job.location || "Remoto"}</span>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full mt-3 inline-block font-medium border ${
                      isDark
                        ? "bg-green-900/30 text-green-400 border-green-800"
                        : "bg-green-100 text-green-700 border-green-200"
                    }`}
                  >
                    ✅ Postulado
                  </span>
                </div>

                {/* Botón de Ir a la Oferta */}
                <a
                  href={link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2
                    ${
                      link
                        ? (isDark
                            ? "bg-gray-700 text-blue-400 hover:bg-gray-600"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-800") +
                          " cursor-pointer"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  onClick={(e) => !link && e.preventDefault()}
                >
                  Ver oferta original
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    ></path>
                  </svg>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
