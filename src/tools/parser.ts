export enum DistanceUnit {
  Parsec = "PARSEC",
  Km = "KM",
  LightYear = "LIGHT_YEAR",
}

export enum TemperatureUnit {
  Kelvin = "KELVIN",
  Celsius = "CELSIUS",
  Fahrenheit = "FAHRENHEIT",
}

export type KelvinParser = {
  conversionUnit: TemperatureUnit;
  setConversionUnit: (unit: TemperatureUnit) => KelvinParser;
  parse: (kelvin: number) => number;
};

export const createKelvinParser = (
  conversionUnit?: TemperatureUnit
): KelvinParser => {
  const parser: KelvinParser = {
    conversionUnit: conversionUnit ? conversionUnit : TemperatureUnit.Kelvin,
    setConversionUnit: (conversionUnit: TemperatureUnit) => {
      parser.conversionUnit = conversionUnit;
      return parser;
    },
    parse: (kelvin: number) => {
      switch (parser.conversionUnit) {
        case TemperatureUnit.Celsius:
          return kelvin - 273.15;
        case TemperatureUnit.Fahrenheit:
          return Math.round(kelvin * (9 / 5) - 459.67);
        default:
          return kelvin;
      }
    },
  };

  return parser;
};

export type ParsecParser = {
  conversionUnit: DistanceUnit;
  setConversionUnit: (unit: DistanceUnit) => ParsecParser;
  parse: (parsec: number) => number;
};

export const createParsecParser = (
  conversionUnit?: DistanceUnit
): ParsecParser => {
  const parser: ParsecParser = {
    conversionUnit: conversionUnit ? conversionUnit : DistanceUnit.Parsec,
    setConversionUnit: (conversionUnit: DistanceUnit) => {
      parser.conversionUnit = conversionUnit;
      return parser;
    },
    parse: (parsec: number) => {
      switch (parser.conversionUnit) {
        case DistanceUnit.Km:
          return parsec * 3.08567758 ** 13;
        case DistanceUnit.LightYear:
          return parsec * 3.26;
        default:
          return parsec;
      }
    },
  };

  return parser;
};
