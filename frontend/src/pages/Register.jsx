import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validacion de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden ❌");
      setIsLoading(false);
      return;
    }

    try {
      const userToSend = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        title: "Nuevo Usuario",
        location: "Sin definir",
        bio: "Hola, soy nuevo en JobFinder.",
      };

      await registerUser(userToSend);

      alert("¡Cuenta creada con éxito! Ahora inicia sesión. 🚀");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100 animate-fade-in-up">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Crear Cuenta</h2>
          <p className="text-gray-500 text-sm mt-1">
            Únete a la comunidad de JobFinder
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              name="fullName"
              type="text"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-black"
              placeholder="Ej: María Gonzalez"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-black"
              placeholder="correo@ejemplo.com"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-black"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none text-black"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all mt-4 disabled:opacity-50"
          >
            {isLoading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
