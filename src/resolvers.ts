import { ApolloError } from "apollo-server-errors";
import { Context } from "./context";
import {
  DistanceUnit,
  FilterCriteria,
  SortMethod,
  SortOrder,
  TemperatureUnit,
} from "./tools";
import { Planet, Star } from "./types";

const exoplanets = async (
  _source: undefined,
  args: {
    filter?: FilterCriteria;
    sort?: SortMethod;
    order?: SortOrder;
  },
  { dataSources, tools }: Context
): Promise<Planet[] | undefined> => {
  const { filter: filterArg, sort: sortArg, order: orderArg } = args;
  const { classifiers, transformers, createFilter, createSort } = tools;
  const { createResponseTransformer } = transformers;
  const { createHabitableZoneClassifier } = classifiers;

  try {
    return (await dataSources.exoplanetArchiveAPI.fetchPlanets())
      .map(createResponseTransformer().transform)
      .map(createHabitableZoneClassifier().evaluate)
      .filter(createFilter(filterArg).filter)
      .sort(createSort(sortArg).setOrder(orderArg).sort);
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const distance = (
  source: Planet,
  args: { unit: DistanceUnit },
  { tools }: Context
): number | undefined => {
  const { unit } = args;
  const { createParsecParser } = tools.parsers;

  if (source.distance) {
    return createParsecParser().setConversionUnit(unit).parse(source.distance);
  }

  return source.distance;
};

const temperature = (
  source: Star,
  args: { unit: TemperatureUnit },
  { tools }: Context
): number | undefined => {
  const { unit } = args;
  const { createKelvinParser } = tools.parsers;

  if (source.temperature) {
    return createKelvinParser()
      .setConversionUnit(unit)
      .parse(source.temperature);
  }

  return source.temperature;
};

export const resolvers = {
  Query: {
    exoplanets,
  },
  Exoplanet: {
    distance,
  },
  Star: {
    temperature,
  },
};
