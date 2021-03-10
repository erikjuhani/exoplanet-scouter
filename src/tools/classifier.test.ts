import {
  proximaCenB,
  gj411b,
  tauCetg,
  trappist1d,
} from "../models/__mocks__/planets";
import {
  createHabitableZoneClassifier,
  HabitableZoneClassifier,
} from "./classifier";

describe("HabitableZoneClassifier", () => {
  let classifier: HabitableZoneClassifier | undefined;

  beforeEach(() => {
    classifier = createHabitableZoneClassifier();
  });

  test.each`
    planet         | expected
    ${proximaCenB} | ${true}
    ${trappist1d}  | ${true}
    ${gj411b}      | ${false}
    ${tauCetg}     | ${false}
  `("", ({ planet, expected }) => {
    const actual = classifier?.evaluate(planet);
    expect(actual?.potentiallyHabitable).toEqual(expected);
  });
});
