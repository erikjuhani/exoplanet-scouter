import { Planet } from "../types";

export enum FilterCriteria {
  OnlyNonControversial = "ONLY_NON_CONTROVERSIAL",
  PotentiallyHabitable = "POTENTIALLY_HABITABLE",
}

export type Filter = {
  criteria?: FilterCriteria;
  negation: 0 | 1;
  negate: () => Filter;
  filter: (planet: Planet) => boolean;
};

export const createFilter = (criteria?: FilterCriteria): Filter => {
  const filter: Filter = {
    criteria,
    negation: 0,
    negate: () => {
      filter.negation = filter.negation ? 0 : 1;
      return filter;
    },
    filter: (planet: Planet) => {
      let key: keyof Planet | undefined = undefined;

      switch (filter.criteria) {
        case FilterCriteria.PotentiallyHabitable:
          key = "potentiallyHabitable";
          break;
        case FilterCriteria.OnlyNonControversial:
          key = "controversial";
          break;
      }

      if (key) {
        return nand(filter.negation, planet[key]);
      }

      return true;
    },
  };

  return filter;
};

const nand = <T>(a: 0 | 1, b: T): boolean => (a ? !b : !!b);
