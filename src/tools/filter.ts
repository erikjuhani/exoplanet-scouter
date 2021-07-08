import { Planet } from "../types";

export enum FilterCriteria {
  OnlyNonControversial = "ONLY_NON_CONTROVERSIAL",
  PotentiallyHabitable = "POTENTIALLY_HABITABLE",
}

type Filter = {
  key: keyof Planet;
  negate: 0 | 1;
};

const filterOptionsMap: Record<FilterCriteria, Filter> = {
  [FilterCriteria.OnlyNonControversial]: { key: "controversial", negate: 1 },
  [FilterCriteria.PotentiallyHabitable]: {
    key: "potentiallyHabitable",
    negate: 0,
  },
};

export function filter(criteria?: FilterCriteria): (planet: Planet) => boolean {
  return (planet: Planet): boolean => {
    if (!criteria) {
      return true;
    }

    const filter = filterOptionsMap[criteria];

    if (filter) {
      return nand(filter.negate, planet[filter.key]);
    }

    return true;
  };
}

export const filterByPotentiallyHabitale = filter(
  FilterCriteria.PotentiallyHabitable
);

const nand = <T>(a: 0 | 1, b: T): boolean => (a ? !b : !!b);
