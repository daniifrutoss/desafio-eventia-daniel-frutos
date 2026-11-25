import { test, expect } from "vitest";
import { crearEvento } from "../../src/eventos.js";

test("crea un evento con datos validos", () => {
  const res = crearEvento("Concierto Estopa ", "2026-12-10", "Madrid", 25, 100);
  expect(res.status).toBe(201);
});

test("no debe dejar crear evento sin titulo", () => {
  const res = crearEvento("", "2026-12-10", "Madrid", 25, 100);
  expect(res.status).toBe(400);
});

test("no debe dejar poner precio negativo", () => {
  const res = crearEvento("Evento Gratis Mal", "2026-12-10", "Madrid", -10, 50);
  expect(res.status).toBe(400);
});

test("no debe dejar crear evento con 0 plazas", () => {
  const res = crearEvento("Evento Sin Sitio", "2026-12-10", "Madrid", 15, 0);
  expect(res.status).toBe(400);
});