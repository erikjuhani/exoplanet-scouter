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
  "Exoplanet is a planet outside of our Solar system."
  type Exoplanet {
    "Most commonly used name in literature."
    name: String!

    "Year the planet was discovered."
    yearOfDiscovery: Int!

    "Boolean flag indicating whether the confirmation status of a planet has been questioned in the published literature."
    controversial: Boolean!

    "Date of last update to planet parameters."
    updatedAt: String!

    """
    Distance to the planetary system in units of parsecs.

    Change returned distance unit by giving a DistanceUnit parameter.
    """
    distance(unit: DistanceUnit = PARSEC): Float

    """
    The longest radius of an elliptic orbit. Measured in astronimical units (AU).
    """
    orbitSemiMajorAxis: Float

    """
    Amount of matter contained in the planet. Measured in units of masses of Jupiter.
    """
    mass: Float

    """
    Amount of mass per unit of volume of the planet. (g/cm**3)
    """
    density: Float

    """
    Planet exists in the habitable zone, which might make it potentially habitable for life.
    """
    potentiallyHabitable: Boolean!

    "The host star of the planet."
    star: Star!
  }
`;

const latLng = `
  """
  Galactic coordinates system is depicted in spherical coordinates. The Sun as it's center.
  """
  type LatLng {
    "Galactic longitude (l) measured in degrees (0° to 360°)"
    longitude: Float!
    "Galactic latitude () measured in degrees (-90° to 90°)"
    latitude: Float!
  }
`;

const xyz = `
  "Galactic Coordinates in cartesian units."
  type XYZ {
    x: Float!
    y: Float!
    z: Float!
  }
`;

const star = `
  union Coordinate = LatLng | XYZ

  "A luminous astronomical object."
  type Star {
    "Stellar name most commonly used in the literature."
    name: String!

    "The amount of planets in the star system."
    orbitingPlanets: Int!

	  "Distance to the planetary system in units of parsecs."
    distance: Float
  
    "Stellar age of the host star."
    age: Float

    """
    Amount of matter contained in the star, measured in units of masses of the Sun.
    """
    mass: Float

    """
    A length of a line from the centre of the star to it's surface. Measured in units of radius of the Sun.
    """
    radius: Float

    """
    Coordinates in Galactic Coordinate system.

    Change returned Coordinate by giving a CoordinateUnit parameter.
    """
    coordinates(unit: CoordinateUnit = LAT_LNG): Coordinate

    """
    Temperature of the star as modeled by a black body emitting the same total amount of electromagnetic radiation.
    
    Change returned temperature unit by giving a TemperatureUnit parameter.
    """
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
  """
  Field descriptions are referenced from here:
  https://exoplanetarchive.ipac.caltech.edu/docs/API_exoplanet_columns.html

  Additionally more information can be retrieved from the introduced link.
  """
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
