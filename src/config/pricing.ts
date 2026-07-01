import { WB } from "./wodbuster";

export interface PricePlan {
  id: string;
  price: number;
  href: string;
  highlight?: boolean;
}

/** Cuotas mensuales — títulos/descripciones traducidos vía i18n `tarifas.plans.<id>` */
export const MONTHLY_PLANS: PricePlan[] = [
  { id: "openLibre", price: 59, href: WB.cuotaOpenLibre },
  { id: "dirigit3", price: 69, href: WB.cuotaDirigit3 },
  { id: "dirigit5", price: 79, href: WB.cuotaDirigit5, highlight: true },
];

/** Bonos y servicios sueltos — traducidos vía i18n `tarifas.addons.<id>` */
export const ADDON_PLANS: PricePlan[] = [
  { id: "clasePrueba", price: 15, href: WB.claseDePrueba },
  { id: "bono5Dirigidas", price: 60, href: WB.bono5Dirigidas },
  { id: "clasePersonal", price: 50, href: WB.clasePersonal },
  { id: "alquilerSala", price: 15, href: WB.alquilerSalaEntrenadores },
  { id: "masajeDeportivo", price: 45, href: WB.masajeDeportivo },
  { id: "bono5Masajes", price: 200, href: WB.bono5Masajes },
  { id: "personalDosUsuarios", price: 60, href: WB.personalDosUsuarios },
  { id: "bono5ClasesPersonales", price: 250, href: WB.bono5ClasesPersonales },
  { id: "ocho_clasesPersonales", price: 350, href: WB.ocho_clasesPersonales },
  { id: "seguroAnual", price: 15, href: WB.seguroDeportivoAnual },
  { id: "matricula", price: 50, href: WB.matricula },
];
