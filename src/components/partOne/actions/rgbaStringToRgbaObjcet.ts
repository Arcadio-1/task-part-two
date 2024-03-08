import { Color_rgba } from "../lib/types";

export const rgbaStringToRgbaObjcet = (RgbaStr: string) => {
  try {
    const regex =
      /rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)?\s*\)/;
    const match = regex.exec(RgbaStr);
    if (!match) {
      throw new Error("wrong String Rgba");
    }
    const [, r, g, b, a = "1"] = match;
    const color: Color_rgba = {
      r: parseInt(r, 10),
      g: parseInt(g, 10),
      b: parseInt(b, 10),
      a: parseFloat(a),
    };
    return color;
  } catch (error) {
    console.log(error);
    return null;
  }
};
