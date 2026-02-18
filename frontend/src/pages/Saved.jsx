import JobCard from "../components/JobCard";
import { applyToJob } from "../services/userService";

export default function Saved({ savedJobs, onToggleSave, isDark }) {
  const handleApply = (job) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const link = job.jobUrl || job.url;

    if (link) window.open(link, "_blank");

    applyToJob(userId, job).catch((err) => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <header className="mb-8">
        <h1
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Mis Guardados
        </h1>
        <p
          className={`text-sm mt-1 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Tienes{" "}
          <span className="font-bold text-red-500">
            {savedJobs.length} ofertas
          </span>{" "}
          en tu lista de deseos.
        </p>
      </header>

      <div className="space-y-5">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => (
            <div key={job.id || job.externalId} className="animate-fade-in-up">
              <JobCard
                {...job}
                isSaved={true}
                onToggleSave={onToggleSave}
                isDark={isDark}
                onApply={() => handleApply(job)}
              />
            </div>
          ))
        ) : (
          <div
            className={`text-center py-20 rounded-xl border border-dashed ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="text-4xl mb-4">💔</div>
            <h3
              className={`text-lg font-medium ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Aún no tienes guardados
            </h3>
            <p className={`mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Marca con el corazón las ofertas que te interesen para verlas
              aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
