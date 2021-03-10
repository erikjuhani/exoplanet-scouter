import { Planet } from "../types";

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
export enum SortMethod {
  Distance = "DISTANCE",
  Discover = "DISCOVERY",
}

export type Sort = {
  method?: SortMethod;
  order: SortOrder;
  setOrder: (order?: SortOrder) => Sort;
  sort: (planetA: Planet, planetB: Planet) => number;
};

export const createSort = (method?: SortMethod): Sort => {
  const sort: Sort = {
    method,
    order: SortOrder.ASC,
    setOrder: (order?: SortOrder) => {
      sort.order = order ? order : SortOrder.ASC;
      return sort;
    },
    sort: (planetA: Planet, planetB: Planet): number => {
      let key: keyof Planet | undefined = undefined;

      switch (sort.method) {
        case SortMethod.Discover:
          key = "yearOfDiscovery";
          break;
        case SortMethod.Distance:
          key = "distance";
          break;
      }

      if (!key) {
        return 0;
      }

      const valA = planetA[key] || Infinity;
      const valB = planetB[key] || Infinity;

      if (typeof valA !== "number" || typeof valB !== "number") return 0;

      if (sort.order === SortOrder.ASC) return valA - valB;

      return valB - valA;
    },
  };

  return sort;
};
