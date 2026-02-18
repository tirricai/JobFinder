import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getMyProfile, updateUserProfile } from "../services/userService";

export default function Profile({ initialUser, onUserUpdate, isDark }) {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    profilePicture: "",
    skills: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialUser) {
      setFormData({
        fullName: initialUser.fullName || "",
        title: initialUser.title || "",
        email: initialUser.username || initialUser.email || "",
        profilePicture: initialUser.profilePicture || "",
        skills: initialUser.skills || [],
      });
    }
  }, [initialUser]);

  // --- LOGICA PARA SUBIDA DE ARCHIVOS (BASE64) ---
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) {
        Swal.fire({
          title: "Imagen muy pesada",
          text: "El tamaño máximo es 2MB. Intenta con una más liviana.",
          icon: "warning",
          background: isDark ? "#1f2937" : "#fff",
          color: isDark ? "#fff" : "#545454",
        });
        return;
      }
      try {
        const base64 = await convertToBase64(file);
        setFormData({ ...formData, profilePicture: base64 });
      } catch (error) {
        console.error("Error convirtiendo imagen", error);
      }
    }
  };

  // --- Handlers Form ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LOGICA DE TAGS ---
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = tagInput.trim();

      if (val && !formData.skills.includes(val)) {
        setFormData({
          ...formData,
          skills: [...formData.skills, val],
        });
        setTagInput("");
      }
    }
  };

  const removeTag = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedUser = await updateUserProfile(initialUser.id, formData);

      const showSuccess = () => {
        Swal.fire({
          title: "¡Perfil actualizado!",
          text: "Tus cambios se han guardado con éxito. ✨",
          icon: "success",
          confirmButtonColor: "#2563EB",
          confirmButtonText: "Genial",
          background: isDark ? "#1f2937" : "#fff",
          color: isDark ? "#fff" : "#545454",
        });
      };

      if (updatedUser) {
        onUserUpdate(updatedUser);
        showSuccess();
      } else {
        const refreshedUser = await getMyProfile(initialUser.id);
        onUserUpdate(refreshedUser);
        showSuccess();
      }
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al guardar los cambios.",
        icon: "error",
        confirmButtonColor: "#EF4444",
        background: isDark ? "#1f2937" : "#fff",
        color: isDark ? "#fff" : "#545454",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  const isBase64 =
    formData.profilePicture && formData.profilePicture.length > 200;

  // --- CLASES DINAMICAS ---
  const inputClass = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
    isDark
      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
  }`;

  const labelClass = `block text-sm font-medium mb-1 ${
    isDark ? "text-gray-300" : "text-gray-700"
  }`;

  const containerClass = `max-w-2xl mx-auto p-8 rounded-xl shadow-sm border animate-fade-in-up transition-colors duration-300 ${
    isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
  }`;

  return (
    <div className={containerClass}>
      <h2
        className={`text-2xl font-bold mb-6 border-b pb-4 ${
          isDark
            ? "text-white border-gray-700"
            : "text-gray-800 border-gray-200"
        }`}
      >
        Editar Mi Perfil
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- SECCION FOTO --- */}
        <div
          className={`flex flex-col sm:flex-row items-start gap-6 mb-6 p-4 rounded-lg border ${
            isDark
              ? "bg-gray-700/50 border-gray-600"
              : "bg-gray-50 border-gray-100"
          }`}
        >
          <div className="relative group mx-auto sm:mx-0">
            <img
              src={formData.profilePicture || defaultImage}
              alt="Preview"
              className={`w-24 h-24 rounded-full object-cover border-4 shadow-md ${
                isDark ? "border-gray-600 bg-gray-600" : "border-white bg-white"
              }`}
              onError={(e) => (e.target.src = defaultImage)}
            />
            <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-lg transition-all transform hover:scale-110">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <div className="flex-1 space-y-3 w-full">
            <div>
              <label className={labelClass}>Foto de Perfil</label>
              <input
                type="text"
                name="profilePicture"
                value={
                  isBase64 ? "Imagen cargada desde PC" : formData.profilePicture
                }
                onChange={handleChange}
                disabled={isBase64}
                placeholder="https://..."
                className={`w-full px-4 py-2 border rounded-lg outline-none text-sm transition-all ${
                  isBase64
                    ? isDark
                      ? "bg-gray-600 text-gray-400 italic border-gray-500"
                      : "bg-gray-100 text-gray-500 italic"
                    : inputClass
                }`}
              />
              {isBase64 && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, profilePicture: "" })
                  }
                  className="text-xs text-red-500 mt-2 font-medium hover:underline flex items-center gap-1"
                >
                  Quitar foto y usar URL
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Nombre Completo</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Tu nombre"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Título Profesional</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Full Stack Developer"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Habilidades
            <span
              className={`text-xs ml-2 font-normal ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              (Presiona Enter para agregar)
            </span>
          </label>

          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className={inputClass}
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {formData.skills.map((skill, index) => (
              <span
                key={index}
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-blue-900/50 text-blue-200 border border-blue-800"
                    : "bg-blue-50 text-blue-700 border border-blue-100"
                }`}
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeTag(skill)}
                  className={`ml-2 rounded-full p-0.5 hover:bg-black/10 transition-colors focus:outline-none`}
                  title="Eliminar etiqueta"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
            {formData.skills.length === 0 && (
              <p
                className={`text-sm italic ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                No has agregado habilidades aún.
              </p>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass}>Email (Usuario)</label>
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            className={`w-full px-4 py-2 border rounded-lg cursor-not-allowed select-none ${
              isDark
                ? "bg-gray-700/50 border-gray-600 text-gray-400"
                : "bg-gray-50 border-gray-200 text-gray-500"
            }`}
          />
        </div>

        <div
          className={`pt-4 flex justify-end border-t ${
            isDark ? "border-gray-700" : "border-gray-100"
          }`}
        >
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
          >
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
