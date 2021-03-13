import { proximaCenResponse } from "../datasource/__mocks__/response";
import { proximaCenB } from "../models/__mocks__/planets";
import { createResponseTransformer } from "./transformer";

describe("ResponseTransformer", () => {
  test.each`
    response              | expected
    ${proximaCenResponse} | ${proximaCenB}
  `("", ({ response, expected }) => {
    delete expected.potentiallyHabitable;
    expect(createResponseTransformer().transform(response)).toEqual(expected);
  });
});
