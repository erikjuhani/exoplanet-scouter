import {
  proximaCenResponse,
  proximaCenCSVResponse,
} from "../datasource/__mocks__/response";
import { proximaCen } from "../models/__mocks__/planets";
import {
  CoordinateUnit,
  csvStringParse,
  DistanceUnit,
  parseKelvins,
  parseLatLng,
  parseParsec,
  TemperatureUnit,
} from "./parser";

describe("ParsecParser", () => {
  test.each`
    parsec | unit                      | expected
    ${1.3} | ${undefined}              | ${1.3}
    ${1.3} | ${DistanceUnit.Parsec}    | ${1.3}
    ${4.8} | ${DistanceUnit.LightYear} | ${15.647999999999998}
    ${8.2} | ${DistanceUnit.Km}        | ${18852586.301836815}
  `("", ({ parsec, unit, expected }) => {
    expect(parseParsec(unit)(parsec)).toEqual(expected);
  });
});

describe("KelvinParser", () => {
  test.each`
    kelvin    | unit                          | expected
    ${273.15} | ${undefined}                  | ${273.15}
    ${273.15} | ${TemperatureUnit.Kelvin}     | ${273.15}
    ${273.15} | ${TemperatureUnit.Celsius}    | ${0}
    ${273.15} | ${TemperatureUnit.Fahrenheit} | ${32}
  `("", ({ kelvin, unit, expected }) => {
    expect(parseKelvins(unit)(kelvin)).toEqual(expected);
  });
});

describe("LatLngParser", () => {
  test.each`
    args                                             | unit                     | expected
    ${[proximaCen.distance, proximaCen.coordinates]} | ${undefined}             | ${proximaCen.coordinates}
    ${[proximaCen.distance, proximaCen.coordinates]} | ${CoordinateUnit.LatLng} | ${proximaCen.coordinates}
    ${[proximaCen.distance, proximaCen.coordinates]} | ${CoordinateUnit.XYZ}    | ${{ x: 0.9023895250918642, y: -0.9364154096631991, z: -0.04375776102342627 }}
  `("", ({ args, unit, expected }) => {
    expect(parseLatLng(unit)(args[0], args[1])).toEqual(expected);
  });
});

describe("csvStringParse", () => {
  test.each`
    csvString                | expected
    ${proximaCenCSVResponse} | ${[proximaCenResponse]}
  `("", ({ csvString, expected }) => {
    expect(csvStringParse(csvString)).toEqual(expected);
  });
});
