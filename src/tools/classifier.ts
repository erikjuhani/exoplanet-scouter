import { Planet } from "../types";

export type HabitableZoneClassifier = {
  evaluate: (planet: Planet) => Planet;
};

export const createHabitableZoneClassifier = (): HabitableZoneClassifier => ({
  evaluate: (planet) => {
    const { star } = planet;

    // We expect that the planet is not habitable.
    planet.potentiallyHabitable = false;

    // Classification cannot be done if these values are not known.
    if (!planet.orbitSemiMajorAxis || !star.radius || !star.temperature) {
      return planet;
    }

    // Values in AU.
    const range = [0.75, 1.77];
    const zoneRadius =
      (star.radius ** 2 * (star.temperature / 5780) ** 4) ** 0.5;

    const inner = range[0] * zoneRadius;
    const outer = range[1] * zoneRadius;

    if (
      planet.orbitSemiMajorAxis >= inner &&
      planet.orbitSemiMajorAxis <= outer
    ) {
      planet.potentiallyHabitable = true;
      return planet;
    }

    return planet;
  },
});
