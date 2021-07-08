import { LatLng, Nullable, Point } from "../types";
import { degToRad } from "./math";

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

export function parseKelvins(
  conversionUnit?: TemperatureUnit
): (value: number) => number {
  return (value: number): number => {
    switch (conversionUnit) {
      case TemperatureUnit.Celsius:
        return value - 273.15;
      case TemperatureUnit.Fahrenheit:
        return Math.round(value * (9 / 5) - 459.67);
      default:
        // Return the original number value as no conversion unit has been defined.
        return value;
    }
  };
}

// TODO: generalize and use an object instead of primitive number value.
// eg. { unit: 'Parsec', value: 1.0 }
// parseParsec expects number value in parsec format.
export function parseParsec(
  conversionUnit?: DistanceUnit
): (value: number) => number {
  return (value: number): number => {
    switch (conversionUnit) {
      case DistanceUnit.Km:
        return value * 3.08567758 ** 13;
      case DistanceUnit.LightYear:
        return value * 3.26;
      default:
        return value;
    }
  };
}

function latLngToXYZ(
  distance: number,
  latitude: number,
  longitude: number
): Point {
  const latRad = degToRad(latitude);
  const lngRad = degToRad(longitude);

  return {
    x: distance * Math.cos(latRad) * Math.cos(lngRad),
    y: distance * Math.cos(latRad) * Math.sin(lngRad),
    z: distance * Math.sin(latRad),
  };
}

function isLatLng(point: Point): point is LatLng {
  const pointAsLatLng = point as LatLng;
  return (
    pointAsLatLng.longitude !== undefined &&
    pointAsLatLng.latitude !== undefined
  );
}

export function parseLatLng(
  conversionUnit?: CoordinateUnit
): (distance: number, coordinates: Point) => Point {
  return (distance: number, coordinates: Point): Point => {
    if (!isLatLng(coordinates)) {
      return coordinates;
    }

    const { latitude, longitude } = coordinates;

    switch (conversionUnit) {
      case CoordinateUnit.XYZ:
        return latLngToXYZ(distance, latitude, longitude);
      default:
        return coordinates;
    }
  };
}

function csvFieldParser(value: string): Nullable<string | number> {
  if (!value.length) {
    return null;
  }

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    // Not a numerical value.
    // Remove double quotes if present.
    return value.replace(/"/g, "");
  }

  return numericValue;
}

export const csvStringParse = <Output>(
  csv: string,
  delimiter = ",",
  linebreak = "\n"
): Output[] => {
  const rawRows = csv.trim().split(linebreak);
  const rows = rawRows.map((rawRow: string) =>
    rawRow.split(delimiter).map(csvFieldParser)
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
