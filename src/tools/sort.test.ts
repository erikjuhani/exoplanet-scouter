import {
  proximaCenB,
  gj411b,
  tauCetg,
  hd219134f,
  trappist1d,
} from "../models/__mocks__/planets";
import { sort, SortMethod, SortOrder } from "./sort";

describe("Filter", () => {
  const planets = [trappist1d, proximaCenB, gj411b, tauCetg, hd219134f];

  test.each`
    method                  | sortOrder         | expected
    ${SortMethod.Discovery} | ${SortOrder.ASC}  | ${[hd219134f, trappist1d, proximaCenB, tauCetg, gj411b]}
    ${SortMethod.Discovery} | ${SortOrder.DESC} | ${[gj411b, tauCetg, trappist1d, proximaCenB, hd219134f]}
    ${SortMethod.Distance}  | ${SortOrder.ASC}  | ${[proximaCenB, gj411b, tauCetg, hd219134f, trappist1d]}
    ${SortMethod.Distance}  | ${SortOrder.DESC} | ${[trappist1d, hd219134f, tauCetg, gj411b, proximaCenB]}
    ${undefined}            | ${undefined}      | ${planets}
  `("evaluate", ({ method, sortOrder, expected }) => {
    expect(planets.sort(sort(method, sortOrder))).toEqual(expected);
  });
});
