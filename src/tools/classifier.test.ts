import {
  proximaCenB,
  gj411b,
  tauCetg,
  trappist1d,
} from "../models/__mocks__/planets";
import { classifyHabitableZone } from "./classifier";

describe("HabitableZoneClassifier", () => {
  test.each`
    planet         | expected
    ${proximaCenB} | ${true}
    ${trappist1d}  | ${true}
    ${gj411b}      | ${false}
    ${tauCetg}     | ${false}
  `("", ({ planet, expected }) => {
    const actual = classifyHabitableZone(planet);
    expect(actual?.potentiallyHabitable).toEqual(expected);
  });
});
