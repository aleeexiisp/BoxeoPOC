/**
 * Roster de coaches. Las fotos son las reales del club (mismo CDN de WodBuster,
 * descargadas a public/img/coaches). Las bios traducidas viven en los
 * diccionarios de i18n bajo `coaches.roster.<id>.bio`.
 *
 * Nota: varios nombres en la web original son apodos/usuarios de WodBuster
 * ("lefoumusicon", "valentintrabajoss"). Se han limpiado donde el patrón era
 * obvio (p. ej. "alex.miserol" -> "Alex Miserol"). Pendiente de confirmar
 * nombres reales con el club (ver DESIGN_PLAN.md §14).
 */

export interface Coach {
  id: string;
  name: string;
  photo: string;
  founder?: boolean;
}

export const COACHES: Coach[] = [
  { id: "jorge-estrella", name: "Jorge Estrella", photo: "/img/coaches/coach-jorge-estrella.jpg" },
  { id: "alvaro", name: "Álvaro", photo: "/img/coaches/coach-alvaro.jpg" },
  { id: "miguel-estrella", name: "Miguel Estrella", photo: "/img/coaches/coach-miguel-estrella.jpg", founder: true },
  { id: "walker", name: "Walker", photo: "/img/coaches/coach-walker.jpg" },
  { id: "alex-miserol", name: "Alex Miserol", photo: "/img/coaches/coach-alex-miserol.jpg" },
  { id: "martin", name: "Martín", photo: "/img/coaches/coach-martin.jpg" },
  { id: "alex-melvar", name: "Alex Melvar", photo: "/img/coaches/coach-alex-melvar.jpg" },
  { id: "lefoumusicon", name: "“Lefoumusicon”", photo: "/img/coaches/coach-lefoumusicon.jpg" },
  { id: "valentin", name: "Valentín", photo: "/img/coaches/coach-valentin.jpg" },
];
