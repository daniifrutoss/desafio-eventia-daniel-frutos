import { events, reservations, getNextReservationId } from "./data.js";

export function crearReserva(userId, eventId, seats) {
  const e = events.find((x) => x.id === Number(eventId));
  if (!e) {
    return {
      status: 404,
      body: { success: false, message: "Evento no encontrado" },
    };
  }

  e.availableSeats -= Number(seats);

  const r = {
    id: getNextReservationId(),
    userId,
    eventId: e.id,
    seats: Number(seats),
    status: "confirmed",
  };

  reservations.push(r);
  return { status: 201, body: { success: true, data: r } };
}