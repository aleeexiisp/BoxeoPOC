/**
 * Todas las URLs de WodBuster (gestión de reservas/pagos de terceros).
 * No se debe modificar el comportamiento de WodBuster: solo enlazamos a él
 * en pestaña nueva desde la landing. Verificar periódicamente que los
 * query strings de `contratar.aspx` siguen resolviendo (WodBuster puede
 * cambiar los IDs internos de tarifa).
 */

export const WB_BASE = "https://boxagranprice.wodbuster.com";

export const WB = {
  /** Zona socios / login */
  socios: `${WB_BASE}/user/default.aspx`,

  /** Listado general de contratación (fallback si un enlace concreto falla) */
  contratarGeneral: `${WB_BASE}/contratar.aspx`,

  /** Cuotas mensuales */
  cuotaOpenLibre: `${WB_BASE}/contratar.aspx?q=1&c=%7b%22Item1%22%3a4%2c%22Item2%22%3a1%7d`,
  cuotaDirigit3: `${WB_BASE}/contratar.aspx?q=1&c=%7b%22Item1%22%3a17%2c%22Item2%22%3a1%7d`,
  cuotaDirigit5: `${WB_BASE}/contratar.aspx?q=1&c=%7b%22Item1%22%3a18%2c%22Item2%22%3a1%7d`,

  /** Bonos y servicios sueltos */
  claseDePrueba: `${WB_BASE}/contratar.aspx?q=2&c=2`,
  bono5Dirigidas: `${WB_BASE}/contratar.aspx?q=2&c=3`,
  clasePersonal: `${WB_BASE}/contratar.aspx?q=2&c=4`,
  alquilerSalaEntrenadores: `${WB_BASE}/contratar.aspx?q=2&c=6`,
  masajeDeportivo: `${WB_BASE}/contratar.aspx?q=2&c=8`,
  bono5Masajes: `${WB_BASE}/contratar.aspx?q=2&c=9`,
  personalDosUsuarios: `${WB_BASE}/contratar.aspx?q=2&c=10`,
  bono5ClasesPersonales: `${WB_BASE}/contratar.aspx?q=2&c=11`,
  ocho_clasesPersonales: `${WB_BASE}/contratar.aspx?q=2&c=12`,
  seguroDeportivoAnual: `${WB_BASE}/contratar.aspx?q=2&c=13`,
  matricula: `${WB_BASE}/contratar.aspx?q=2&c=14`,
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/boxagranprice/",
  facebook: "https://www.facebook.com/boxagranprice/",
} as const;

export const CONTACT = {
  address: "Carrer d'Aragó 289, entre Pau Claris i Roger de Llúria",
  city: "08009 Barcelona",
  phones: ["648 10 76 10", "932 65 97 49"],
  clubNumber: "N.19441",
} as const;
