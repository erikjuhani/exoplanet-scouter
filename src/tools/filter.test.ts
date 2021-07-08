import {
  proximaCenB,
  gj411b,
  tauCetg,
  hd219134f,
} from "../models/__mocks__/planets";
import { filter, FilterCriteria } from "./filter";

describe("Filter", () => {
  const planets = [proximaCenB, gj411b, tauCetg, hd219134f];

  test.each`
    criteria                               | expected
    ${FilterCriteria.PotentiallyHabitable} | ${[proximaCenB]}
    ${FilterCriteria.OnlyNonControversial} | ${[proximaCenB, gj411b, tauCetg]}
  `("evaluate", ({ criteria, expected }) => {
    const actual = planets.filter(filter(criteria));
    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});
