import { events, reservations } from "./data.js";

export function cancelarReserva(userId, reservationId) {
  const r = reservations.find((x) => x.id === Number(reservationId));
  if (!r) {
    return {
      status: 404,
      body: { success: false, message: "Reserva no encontrada" },
    };
  }

  r.status = "cancelled";
  const e = events.find((x) => x.id === r.eventId);
  if (e) {
    e.availableSeats += r.seats;
  }

  return { status: 200, body: { success: true, data: r } };
}