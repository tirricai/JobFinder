import { useState } from "react";
import JobCard from "../components/JobCard";
import Pagination from "../components/Pagination";
import { applyToJob } from "../services/userService";

export default function Home({
  jobs,
  searchTerm,
  savedJobIds,
  onToggleSave,
  isDark,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [filterType, setFilterType] = useState("TODOS");

  // Logica de aplicar
  const handleApply = (job) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("⚠️ Debes iniciar sesión para aplicar.");
      return;
    }

    const link = job.jobUrl || job.url;

    // Abrir empleo
    if (link) {
      window.open(link, "_blank");
    } else {
      console.error("❌ No se encontró enlace en el objeto:", job);
      alert("Lo siento, esta oferta no tiene un enlace externo válido.");
      return;
    }

    // Guardar en BD
    applyToJob(userId, job).catch((err) => {
      console.error("Error guardando postulación en historial:", err);
    });
  };

  // --- LOGICA DE BIENVENIDA ---
  const isInitialState =
    !searchTerm &&
    jobs.some((j) => j.externalId && j.externalId.startsWith("demo-"));

  // --- LOGICA DE FILTRADO ---
  const filteredJobs = jobs.filter((job) => {
    if (filterType === "TODOS") return true;
    return job.type === filterType;
  });

  // --- PAGINACION ---
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const changeFilter = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  // Dinamica de estilos
  const getBtnStyle = (type) => {
    const base =
      "px-4 py-1.5 rounded-full text-sm font-medium transition-all border ";

    if (filterType === type) {
      return base + "bg-blue-600 text-white border-blue-600 shadow-md";
    }

    if (isDark) {
      return (
        base + "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
      );
    }
    return base + "bg-white text-gray-600 border-gray-200 hover:bg-gray-50";
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* ... (SECCIÓN DE BIENVENIDA / HEADER IGUAL QUE ANTES) ... */}
      {isInitialState ? (
        <div
          className={`mb-8 p-8 rounded-2xl text-center shadow-sm border transition-colors animate-fade-in-up
            ${
              isDark
                ? "bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700"
                : "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
            }`}
        >
          <h1
            className={`text-3xl font-bold mb-3 ${
              isDark ? "text-white" : "text-blue-900"
            }`}
          >
            ¡Bienvenido a JobFinder! 🚀
          </h1>
          <p
            className={`text-lg mb-6 max-w-2xl mx-auto ${
              isDark ? "text-gray-300" : "text-blue-700"
            }`}
          >
            La herramienta más simple para encontrar tu próximo trabajo.
            <br />
            Explora ofertas de toda la web en un solo lugar.
          </p>
          <div
            className={`inline-flex items-center gap-2 text-sm font-medium ${
              isDark ? "text-gray-400" : "text-blue-600 opacity-80"
            }`}
          >
            <span>👇 Aquí tienes algunos ejemplos variados</span>
          </div>
        </div>
      ) : (
        <header className="mb-6 animate-fade-in-up">
          <h1
            className={`text-2xl font-bold transition-colors ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            {searchTerm
              ? `Resultados para "${searchTerm}"`
              : "Ofertas Destacadas"}
          </h1>
          <p
            className={`text-sm mt-1 transition-colors ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Viendo{" "}
            <span
              className={`font-bold ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {filteredJobs.length}
            </span>{" "}
            resultados
            {searchTerm && <span> para "{searchTerm}"</span>}
          </p>
        </header>
      )}

      {/* --- BOTONES DE FILTRO --- */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => changeFilter("TODOS")}
          className={getBtnStyle("TODOS")}
        >
          Todos
        </button>
        <button
          onClick={() => changeFilter("Remoto")}
          className={getBtnStyle("Remoto")}
        >
          🌎 Remoto
        </button>
        <button
          onClick={() => changeFilter("Presencial")}
          className={getBtnStyle("Presencial")}
        >
          🏢 Presencial
        </button>
      </div>

      {/* --- LISTA DE TRABAJOS --- */}
      <div className="space-y-5">
        {currentJobs.length > 0 ? (
          <div key={currentPage + searchTerm + filterType}>
            {currentJobs.map((job, index) => {
              const uniqueId = job.id || job.externalId;
              return (
                <div
                  key={uniqueId}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <JobCard
                    {...job}
                    isSaved={savedJobIds.includes(uniqueId)}
                    onToggleSave={onToggleSave}
                    onApply={() => handleApply(job)}
                    isDark={isDark}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={`text-center py-10 rounded-xl border border-dashed animate-fade-in-up ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <p className={`${isDark ? "text-gray-400" : "text-gray-500"}`}>
              No hay ofertas{" "}
              <strong>
                {filterType !== "TODOS" ? filterType.toLowerCase() + "s" : ""}
              </strong>{" "}
              disponibles 😢
            </p>
            {filterType !== "TODOS" && (
              <button
                onClick={() => changeFilter("TODOS")}
                className={`text-sm mt-2 font-medium hover:underline ${
                  isDark ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Ver todas las ofertas
              </button>
            )}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrev={handlePrev}
        isDark={isDark}
      />
    </div>
  );
}
