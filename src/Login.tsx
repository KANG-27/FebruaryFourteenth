import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const MAX_ACCESOS = 3;
  const STORAGE_KEY = "accesos";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ nombre: "", contraseña: "" });

  // Función para verificar y manejar accesos
  const verificarAccesos = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    const hoy = new Date().toDateString();

    if (data) {
      const { fecha, accesos } = JSON.parse(data);

      if (fecha !== hoy) {
        // Reiniciar accesos si es un nuevo día
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ fecha: hoy, accesos: 1 })
        );
        return true;
      }

      if (accesos < MAX_ACCESOS) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ fecha: hoy, accesos: accesos + 1 })
        );
        return true;
      } else {
        return false; // Se superó el límite de accesos
      }
    } else {
      // Primera vez que accede
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ fecha: hoy, accesos: 1 })
      );
      return true;
    }
  };

  // Ejecutar la verificación de accesos una sola vez al montar el componente
  useEffect(() => {
    if (!verificarAccesos()) {
      alert("Has alcanzado el límite de accesos por hoy.");
    }
  }, []);

  // Función para manejar cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para animar el error en inputs
  const shakeInput = (input: HTMLInputElement) => {
    input.classList.remove("errInput");
    void input.offsetWidth; // Forzar reflow
    input.classList.add("errInput");
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const inputName = form.querySelector<HTMLInputElement>(
      "input[name='nombre']"
    );
    const inputPassword = form.querySelector<HTMLInputElement>(
      "input[name='contraseña']"
    );

    let valid = true;

    if (formData.nombre !== "juana") {
      valid = false;
      if (inputName) shakeInput(inputName);
    }

    if (formData.contraseña !== "gamora") {
      valid = false;
      if (inputPassword) shakeInput(inputPassword);
    }

    if (valid) {
      console.log("Formulario enviado con:", formData);
      navigate("/inicio");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <h1>
        Bienvenido a Febrary<span className="text-[20px]">14th</span>
      </h1>
      <div className="flex flex-col bg-white text-black rounded-lg w-[30%] mt-10 px-20 py-15">
        <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            Nombre:
            <input
              name="nombre"
              type="text"
              className="border-2 bg-gray rounded-lg"
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col">
            Contraseña:
            <input
              type="password"
              name="contraseña"
              className="border-2 bg-gray rounded-lg"
              onChange={handleChange}
            />
          </label>
          {!verificarAccesos() ? (
            <button className="text-white" type="submit">
              Entrar
            </button>
          ):<span>No puedes entrar mas hoy</span>}
        </form>
      </div>
    </div>
  );
}
