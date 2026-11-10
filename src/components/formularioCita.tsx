import { useState } from "react";
import { crearCita } from "../services/citasApi";

type Props = {
  onCreada: () => void | Promise<void>;
};

export default function FormularioCita({ onCreada }: Props) {
  const [mascota, setMascota] = useState("");
  const [cliente, setCliente] = useState("");
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [enviando, setEnviando] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setEnviando(true);
        try {
          await crearCita({ mascota, cliente, servicio, fecha, hora });
          setMascota("");
          setCliente("");
          setServicio("");
          setFecha("");
          setHora("");
          await onCreada();
        } catch (error) {
          alert(
            error instanceof Error ? error.message : "No se pudo crear la cita.",
          );
        } finally {
          setEnviando(false);
        }
      }}
    >
      <h2>Nueva cita</h2>

      <input
        placeholder="Mascota"
        value={mascota}
        onChange={(e) => setMascota(e.target.value)}
        required
      />
      <input
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        required
      />
      <input
        placeholder="Servicio"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
        required
      />
      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        required
      />
      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
      />

      <button type="submit" disabled={enviando}>
        {enviando ? "Enviando..." : "Agendar cita"}
      </button>
    </form>
  );
}