import { FilterType } from "@/constants/AdminTourTypes";
import { Tour } from "@/constants/Tours";

export function filterTours(tours: Tour[], filter: FilterType): Tour[] {
  switch (filter) {
    case "active":
      return tours.filter((t) => t.placesLeft > 0);

    case "archived":
      return tours.filter((t) => t.placesLeft === 0);

    case "mostpopular":
      return tours.filter((t) => (t.rating ?? 0) > 4.8);

    case "popular":
      return tours.filter((t) => (t.rating ?? 0) >= 4.5);

    case "lowDemand":
      return tours.filter((t) => (t.rating ?? 0) < 4.5);

    case "unpopular":
      return tours.filter((t) => (t.rating ?? 0) < 4.0);

    case "all":
    default:
      return tours;
  }
}
