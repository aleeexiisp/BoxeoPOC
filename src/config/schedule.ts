/**
 * Horario semanal ("Standard 1") tal y como aparece en la web actual.
 * Los tipos de clase se traducen vía i18n (horario.legend.*); aquí solo
 * se codifica la estructura (día × franja horaria → tipo de clase).
 */

export type ClassType = "dirigit" | "open" | "personal" | null;

export const HOURS = [
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
] as const;

export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type DayKey = (typeof DAY_KEYS)[number];

const WEEKDAY: ClassType[] = ["dirigit", "open", "dirigit", "open", "dirigit", "open", "dirigit", "open", "open", "dirigit", "dirigit", "dirigit", "dirigit"];
const ALT_WEEKDAY: ClassType[] = ["open", "personal", "open", "personal", "open", "personal", "open", "open", "open", "open", "open", "open", "open"];
const WEEKEND_DIRIGIT: ClassType[] = ["dirigit", "open", "dirigit", "open", "dirigit", "open", "dirigit", null, null, "dirigit", "dirigit", "dirigit", "dirigit"];
const WEEKEND_OPEN: ClassType[] = ["open", "personal", "open", "personal", "open", "personal", "open", null, null, "open", "open", "open", "open"];

export const SCHEDULE: Record<DayKey, ClassType[]> = {
  mon: WEEKDAY,
  tue: ALT_WEEKDAY,
  wed: WEEKDAY,
  thu: ALT_WEEKDAY,
  fri: WEEKDAY,
  sat: WEEKEND_OPEN,
  sun: WEEKEND_DIRIGIT,
};
