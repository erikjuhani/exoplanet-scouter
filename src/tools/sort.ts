import { Planet } from "../types";

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
export enum SortMethod {
  Distance = "DISTANCE",
  Discovery = "DISCOVERY",
}

type PlanetValueTypes = Planet[keyof Planet];

type Sort = {
  key: keyof Planet;
  transform?: (value: PlanetValueTypes) => number;
};

const sortOptionsMap: Record<SortMethod, Sort> = {
  [SortMethod.Distance]: { key: "distance" },
  [SortMethod.Discovery]: { key: "yearOfDiscovery" },
};

export function sort(
  method?: SortMethod,
  order = SortOrder.ASC
): (p0: Planet, p1: Planet) => number {
  if (!method) {
    return (): number => 0;
  }

  const { key, transform } = sortOptionsMap[method];

  return (p0: Planet, p1: Planet): number => {
    const val0 = transform ? transform(p0[key]) : p0[key] ?? Infinity;
    const val1 = transform ? transform(p1[key]) : p1[key] ?? Infinity;

    if (typeof val0 !== "number" || typeof val1 !== "number") return 0;

    return order === SortOrder.ASC ? val0 - val1 : val1 - val0;
  };
}
