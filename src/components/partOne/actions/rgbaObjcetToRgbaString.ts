import { Color_rgba } from "../lib/types";

export const rgbaObjcetToRgbaString = (RgbaObj: Color_rgba) => {
  try {
    const { r, g, b, a } = RgbaObj;
    const color = `rgba(${Math.floor(r)},${Math.floor(g)},${Math.floor(
      b
    )},${a})`;
    return color;
  } catch (error) {
    return "";
  }
};
