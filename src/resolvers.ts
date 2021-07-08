import { ApolloError } from "apollo-server-errors";
import { IResolvers } from "graphql-tools";
import { Context } from "./context";
import {
  filter,
  classifyHabitableZone,
  CoordinateUnit,
  DistanceUnit,
  FilterCriteria,
  SortMethod,
  SortOrder,
  TemperatureUnit,
  transformResponse,
  sort,
  parseParsec,
  parseKelvins,
  parseLatLng,
} from "./tools";
import { LatLng, Nullable, Planet, Point, Star, XYZ } from "./types";

const exoplanets = async (
  _source: undefined,
  args: {
    filter?: FilterCriteria;
    sort?: SortMethod;
    order?: SortOrder;
  },
  { dataSources }: Context
): Promise<Planet[] | undefined> => {
  const { filter: filterArg, sort: sortArg, order: orderArg } = args;

  const filterWithCriteria = filter(filterArg);
  const sortWithArgs = sort(sortArg, orderArg);

  try {
    return (await dataSources.exoplanetArchiveAPI.fetchPlanets())
      .map(transformResponse)
      .map(classifyHabitableZone)
      .filter(filterWithCriteria)
      .sort(sortWithArgs);
  } catch (err) {
    throw new ApolloError(err.message);
  }
};

const distance = (
  source: Planet,
  args: { unit: DistanceUnit }
): Nullable<number | undefined> => {
  const { unit } = args;

  if (source.distance) {
    const convertParsecsFrom = parseParsec(unit);
    return convertParsecsFrom(source.distance);
  }

  return source.distance;
};

const temperature = (
  source: Star,
  args: { unit: TemperatureUnit }
): Nullable<number | undefined> => {
  const { unit } = args;

  if (source.temperature) {
    const convertFromKelvins = parseKelvins(unit);
    return convertFromKelvins(source.temperature);
  }

  return source.temperature;
};

const coordinates = (source: Star, args: { unit: CoordinateUnit }): Point => {
  const { unit } = args;

  if (source.distance) {
    const parseLatLngFromPoint = parseLatLng(unit);
    return parseLatLngFromPoint(source.distance, source.coordinates);
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
