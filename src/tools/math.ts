import { halfPI } from "./constants";

export function degToRad(degress: number): number {
  return degress * halfPI;
}
