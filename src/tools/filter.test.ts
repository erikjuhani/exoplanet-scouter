import {
  proximaCenB,
  gj411b,
  tauCetg,
  hd219134f,
} from "../models/__mocks__/planets";
import { Planet } from "../types";
import { createFilter, FilterCriteria } from "./filter";

describe("Filter", () => {
  const planets = [proximaCenB, gj411b, tauCetg, hd219134f];

  test.each`
    criteria                               | negate   | expected
    ${FilterCriteria.PotentiallyHabitable} | ${false} | ${[proximaCenB]}
    ${FilterCriteria.OnlyNonControversial} | ${true}  | ${[proximaCenB, gj411b, tauCetg]}
  `("evaluate", ({ criteria, negate, expected }) => {
    let actual: Planet[] = [];
    if (negate) {
      actual = planets.filter(createFilter(criteria).negate().filter);
    } else {
      actual = planets.filter(createFilter(criteria).filter);
    }
    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});
