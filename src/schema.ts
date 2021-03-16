import { gql } from "apollo-server-core";

const distanceUnit = `
  enum DistanceUnit {
    PARSEC
    LIGHT_YEAR
    KM
  }
`;

const temperatureUnit = `
  enum TemperatureUnit {
    KELVIN
    CELSIUS
    FAHRENHEIT
  }
`;

const coordinateUnit = `
  enum CoordinateUnit {
    LAT_LNG
    XYZ
  }
`;

const filterMethod = `
  enum FilterCriteria {
    ONLY_NON_CONTROVERSIAL
    POTENTIALLY_HABITABLE
  }
`;

const sortMethod = `
  enum SortMethod {
    DISTANCE
    DISCOVERY
  }
`;

const order = `
  enum Order {
    ASC
    DESC
  }
`;

const exoplanet = `
  type Exoplanet {
    name: String!
    yearOfDiscovery: Int!
    controversial: Boolean!
    updatedAt: String!
    distance(unit: DistanceUnit = PARSEC): Float
    orbitSemiMajorAxis: Float
    mass: Float
    density: Float
    potentiallyHabitable: Boolean!
    star: Star!
  }
`;

const latLng = `
  type LatLng {
    longitude: Float!
    latitude: Float!
  }
`;

const xyz = `
  type XYZ {
    x: Float!
    y: Float!
    z: Float!
  }
`;

const star = `
  union Coordinate = LatLng | XYZ

  type Star {
    name: String!
    orbitingPlanets: Int!
    hdName: String
    hipName: String
    distance: Float
    age: Float
    mass: Float
    radius: Float
    coordinates(unit: CoordinateUnit = LAT_LNG): Coordinate
    temperature(unit: TemperatureUnit = KELVIN): Float
  }
`;

const exoplanetQuery = `
    exoplanets(
      filter: FilterCriteria
      sort: SortMethod
      order: Order
    ): [Exoplanet]
`;

export const typeDefs = gql`
  ${distanceUnit}
  ${temperatureUnit}
  ${coordinateUnit}
  ${latLng}
  ${xyz}
  ${filterMethod}
  ${sortMethod}
  ${order}
  ${exoplanet}
  ${star}

  type Query {
    ${exoplanetQuery}
  }
`;
