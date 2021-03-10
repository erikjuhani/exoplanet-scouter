import {
  createHabitableZoneClassifier,
  HabitableZoneClassifier,
} from "./classifier";
import { createFilter, Filter, FilterCriteria } from "./filter";
import {
  TemperatureUnit,
  DistanceUnit,
  createParsecParser,
  ParsecParser,
  KelvinParser,
  createKelvinParser,
} from "./parser";
import { createSort, Sort, SortMethod } from "./sort";
import { createResponseTransformer, ResponseTransformer } from "./transformer";

export * from "./sort";
export * from "./filter";
export * from "./parser";
export * from "./transformer";
export * from "./classifier";

export type Tools = {
  createFilter: (criteria?: FilterCriteria) => Filter;
  createSort: (method?: SortMethod) => Sort;
  transformers: {
    createResponseTransformer: () => ResponseTransformer;
  };
  classifiers: {
    createHabitableZoneClassifier: () => HabitableZoneClassifier;
  };
  parsers: {
    createParsecParser: (distanceUnit?: DistanceUnit) => ParsecParser;
    createKelvinParser: (temperatureUnit?: TemperatureUnit) => KelvinParser;
  };
};

export const tools: Tools = {
  createFilter,
  createSort,
  transformers: {
    createResponseTransformer,
  },
  classifiers: {
    createHabitableZoneClassifier,
  },
  parsers: {
    createParsecParser,
    createKelvinParser,
  },
};
