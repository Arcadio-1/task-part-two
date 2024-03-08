export const lowLevelRegex = new RegExp(
  /\s*[\w\-+\.\!\?\:\;\,\(\)\[\]\{\}]+(?:\s+[\w\-+\.\!\?\:\;\,\(\)\[\]\{\}\%]+)*\s*$/
);
export interface Color_rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type SetCategoryResponse =
  | {
      status: "Success";
      ok: true;
      message: string;
    }
  | {
      status: "Error";
      ok: false;
      message: string;
    };
