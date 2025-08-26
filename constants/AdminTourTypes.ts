export type FilterType =
  | "all"
  | "active"
  | "archived"
  | "popular"
  | "lowDemand"
  | "unpopular"
  | "mostpopular";

export const FILTER_LABELS: Record<FilterType, string> = {
  all: "Все туры",
  active: "Активные",
  archived: "В архиве",
  popular: "Популярные",
  lowDemand: "Менее популярные",
  unpopular: "Не пользуются спросом",
  mostpopular: "Самые популярные",
};
