import { FilterType } from "@/constants/AdminTourTypes";
import { Tour } from "@/constants/Tours";

export function filterTours(tours: Tour[], filter: FilterType): Tour[] {
  switch (filter) {
    case "active":
      return tours.filter((t) => t.placesLeft > 0);
    case "archived":
      return tours.filter((t) => t.placesLeft === 0);
    case "popular":
      return tours.filter((t) => t.rating >= 4.8);
    case "lowDemand":
      return tours.filter((t) => t.rating < 4.5);
    default:
      return tours;
  }
}
