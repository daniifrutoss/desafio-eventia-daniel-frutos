import { test, expect } from "vitest";
import { crearReserva } from "../../src/reservas.js";
import { cancelarReserva } from "../../src/cancelar.js";

test("cancela una reserva correctamente", () => {
  const creada = crearReserva(2, 1, 2);
  const res = cancelarReserva(2, creada.body.data.id);
  expect(res.status).toBe(200);
});

test("error si la reserva no existe", () => {
  const res = cancelarReserva(2, 999);
  expect(res.status).toBe(404);
});

test("no debe dejar cancelar la reserva de otro usuario", () => {
  const creada = crearReserva(2, 1, 2);
  const res = cancelarReserva(3, creada.body.data.id);
  expect(res.status).toBe(403);
});

test("no debe dejar cancelar dos veces la misma reserva", () => {
  const creada = crearReserva(2, 1, 2);
  cancelarReserva(2, creada.body.data.id);
  const res2 = cancelarReserva(2, creada.body.data.id);
  expect(res2.status).toBe(400);
});