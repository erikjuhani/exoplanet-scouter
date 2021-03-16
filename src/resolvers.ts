import { ApolloError } from "apollo-server-errors";
import { IResolvers } from "graphql-tools";
import { Context } from "./context";
import {
  CoordinateUnit,
  DistanceUnit,
  FilterCriteria,
  SortMethod,
  SortOrder,
  TemperatureUnit,
} from "./tools";
import { LatLng, Nullable, Planet, Star, XYZ } from "./types";

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
): Nullable<number | undefined> => {
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
): Nullable<number | undefined> => {
  const { unit } = args;
  const { createKelvinParser } = tools.parsers;

  if (source.temperature) {
    return createKelvinParser()
      .setConversionUnit(unit)
      .parse(source.temperature);
  }

  return source.temperature;
};

const coordinates = (
  source: Star,
  args: { unit: CoordinateUnit },
  { tools }: Context
): LatLng | XYZ => {
  const { unit } = args;
  const { createLatLngParser } = tools.parsers;

  if (source.distance) {
    return createLatLngParser()
      .setConversionUnit(unit)
      .parse(source.distance, source.coordinates as LatLng);
  }

  return source.coordinates;
};

export const resolvers: IResolvers = {
  Coordinate: {
    __resolveType: (obj: LatLng | XYZ): string => {
      if ("latitude" in obj) {
        return "LatLng";
      }

      return "XYZ";
    },
  },
  Query: {
    exoplanets,
  },
  Exoplanet: {
    distance,
  },
  Star: {
    temperature,
    coordinates,
  },
};
