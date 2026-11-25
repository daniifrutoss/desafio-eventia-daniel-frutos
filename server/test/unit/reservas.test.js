import { test, expect } from "vitest";
import { crearReserva } from "../../src/reservas.js";

test("reserva correcta con datos validos", () => {
  const res = crearReserva(2, 1, 2);
  expect(res.status).toBe(201);
});

test("error si eld evento no existe", () => {
  const res = crearReserva(2, 99, 2);
  expect(res.status).toBe(404);
});

test("no debe dejar reservar plazas negativas", () => {
  const res = crearReserva(2, 1, -3);
  expect(res.status).toBe(400);
});

test("no debe dejar reservar 0 plazas", () => {
  const res = crearReserva(2, 1, 0);
  expect(res.status).toBe(400);
});

test("no debe dejar reservar mas plazas de las que hay", () => {
  const res = crearReserva(2, 1, 100);
  expect(res.status).toBe(400);
});

test("no debe dejar reservar si se manda texto o nada", () => {
  const res1 = crearReserva(2, 1, "hola");
  const res2 = crearReserva(2, 1);
  expect(res1.status).toBe(400);
  expect(res2.status).toBe(400);
});