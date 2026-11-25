import { test, expect } from "@playwright/test";

test("1. Carga de eventos y funcionamiento de la barra de busqueda de eventos", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("h1")).toContainText("Experiencias");
  await expect(page.locator("#event-list")).toContainText("plazas disponibles");

  await page.fill("#search", "eventoinexistente");
  await expect(page.locator("#event-list")).toBeEmpty();
});

test("2. comprobacion de contraseña incorrecta e inicio de sesión", async ({ page }) => {
  await page.goto("/");

  await page.fill("#password", "irfvirvmivirvirni");
  await page.click("#login-form button");
  await expect(page.locator("#login-message")).toHaveText("Credenciales incorrectas");

  await page.reload();
  await page.click("#login-form button");
  await expect(page.locator("#login-message")).toHaveText("Sesión iniciada.");
  await expect(page.locator("#session")).toContainText("Sesión:");
});

test("3. Bloqueo de creación de eventos a usuarios sin ser de administradores", async ({ page }) => {
  await page.goto("/");

  await page.click("#login-form button");
  await expect(page.locator("#login-message")).toHaveText("Sesión iniciada.");

  await page.fill('input[name="title"]', "Evento no autorizado");
  await page.fill('input[name="date"]', "2026-12-15");
  await page.fill('input[name="venue"]', "Sala Principal");
  await page.fill('input[name="capacity"]', "30");
  await page.fill('input[name="description"]', "Prueba de control de permisos");
  await page.click("#event-form button");

  await expect(page.locator("#admin-message")).toHaveText("Acceso restringido");
});

