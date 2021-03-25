import { LatLng, XYZ } from "../types";
import { MathUtil } from "./math";

// TODO: Separate other parse functions from parsers see: csvStringParse().
// TODO: Use the generic ParserFactory instead, to create Parsers.
// TODO: Move Unit enums to types file.
// TODO: Create parsers directory and move/use explicit file names for each parser. e.g. `parser/parsec.ts`

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

export enum CoordinateUnit {
  LatLng = "LAT_LNG",
  XYZ = "XYZ",
}

export type Parser<T, U, R = undefined> = {
  conversionUnit: T;
  setConversionUnit: (unit: T) => Parser<T, U, R>;
  parse: (
    ...args: U extends unknown[] ? U : U[]
  ) => R extends undefined ? U : R;
};

export type KelvinParser = Parser<TemperatureUnit, number>;

export const createKelvinParser = (
  conversionUnit?: TemperatureUnit
): KelvinParser => {
  const parser: KelvinParser = {
    conversionUnit: conversionUnit ? conversionUnit : TemperatureUnit.Kelvin,
    setConversionUnit: (conversionUnit: TemperatureUnit) => {
      parser.conversionUnit = conversionUnit;
      return parser;
    },
    parse: (kelvin: number): number => {
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

export type ParsecParser = Parser<DistanceUnit, number>;

export const createParsecParser = (
  conversionUnit?: DistanceUnit
): ParsecParser => {
  const parser: ParsecParser = {
    conversionUnit: conversionUnit ? conversionUnit : DistanceUnit.Parsec,
    setConversionUnit: (conversionUnit: DistanceUnit) => {
      parser.conversionUnit = conversionUnit;
      return parser;
    },
    parse: (parsec: number): number => {
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

export type ParseFn<T, R = undefined> = (
  ...args: T extends unknown[] ? T : T[]
) => R extends undefined ? T : R;

export type LatLngParser = Parser<
  CoordinateUnit,
  [number, LatLng],
  LatLng | XYZ
>;

export const ParserFactory = <T, U>(defaultUnit: T, parse: ParseFn<U>) => (
  unit?: T
): Parser<T, U> => {
  const parser: Parser<T, U> = {
    conversionUnit: unit ? unit : defaultUnit,
    setConversionUnit: (conversionUnit: T) => {
      parser.conversionUnit = conversionUnit;
      return parser;
    },
    parse,
  };

  return parser;
};

export const createLatLngParser = (
  conversionUnit?: CoordinateUnit
): LatLngParser => {
  const parser: LatLngParser = {
    conversionUnit: conversionUnit ? conversionUnit : CoordinateUnit.LatLng,
    setConversionUnit: (conversionUnit: CoordinateUnit) => {
      parser.conversionUnit = conversionUnit;
      return parser;
    },
    parse: (distance: number, coordinates: LatLng): LatLng | XYZ => {
      const { latitude, longitude } = coordinates;

      const xyz = (): XYZ => {
        const latRad = MathUtil.radians(latitude);
        const lngRad = MathUtil.radians(longitude);

        return {
          x: distance * Math.cos(latRad) * Math.cos(lngRad),
          y: distance * Math.cos(latRad) * Math.sin(lngRad),
          z: distance * Math.sin(latRad),
        };
      };

      switch (parser.conversionUnit) {
        case CoordinateUnit.XYZ:
          return xyz();
        default:
          return coordinates;
      }
    },
  };

  return parser;
};

export const csvStringParse = <
  Output extends Record<string, string | number | null>
>(
  csv: string
): Output[] => {
  const delimiter = ",";
  const linebreak = "\n";

  const parseCellValue = (cellValue: string) => {
    if (!cellValue.length) {
      return null;
    }

    const value = parseFloat(cellValue);
    if (isNaN(value)) {
      // Not a numerical value.
      // Remove double quotes if present.
      return cellValue.replace(/"/g, "");
    }

    return value;
  };

  const rawRows = csv.trim().split(linebreak);
  const rows = rawRows.map((rawRow: string) =>
    rawRow.split(delimiter).map(parseCellValue)
  );

  // Header cell values are always present.
  const header = rows.shift()?.map((row) => row as string);

  if (!header) {
    return [];
  }

  const objData = rows.map((row) => {
    return row.reduce((obj, cell, i) => {
      return { ...obj, [header[i]]: cell };
    }, {});
  });

  return objData as Output[];
};
