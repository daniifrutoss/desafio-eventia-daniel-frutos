import { events } from "./data.js";

export function crearEvento(title, date, location, price, totalSeats) {
  const nuevoEvento = {
    id: events.length + 1,
    title,
    date,
    location,
    price: Number(price),
    totalSeats: Number(totalSeats),
    availableSeats: Number(totalSeats),
  };

  events.push(nuevoEvento);
  return { status: 201, body: { success: true, data: nuevoEvento } };
}