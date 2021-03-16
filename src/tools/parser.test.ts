import { proximaCen } from "../models/__mocks__/planets";
import {
  CoordinateUnit,
  createKelvinParser,
  createLatLngParser,
  createParsecParser,
  DistanceUnit,
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
    expect(createParsecParser().setConversionUnit(unit).parse(parsec)).toEqual(
      expected
    );
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
    expect(createKelvinParser().setConversionUnit(unit).parse(kelvin)).toEqual(
      expected
    );
  });
});

describe("LatLngParser", () => {
  test.each`
    args                                             | unit                     | expected
    ${[proximaCen.distance, proximaCen.coordinates]} | ${undefined}             | ${proximaCen.coordinates}
    ${[proximaCen.distance, proximaCen.coordinates]} | ${CoordinateUnit.LatLng} | ${proximaCen.coordinates}
    ${[proximaCen.distance, proximaCen.coordinates]} | ${CoordinateUnit.XYZ}    | ${{ x: 0.9015639317657103, y: -0.9355594051126915, z: -0.043715860329410584 }}
  `("", ({ args, unit, expected }) => {
    expect(
      createLatLngParser().setConversionUnit(unit).parse(args[0], args[1])
    ).toEqual(expected);
  });
});
