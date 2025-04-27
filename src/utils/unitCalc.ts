
interface PxToUnitOptions {
  type: "vh" | "vw" | "%";
  base?: number; // %일 때 기준값 (default 100)
  precision?: number;
}

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

/**
 * px → vw, vh, % 비율 변환 (디자인 기준)
 */
export function pxToDesignUnit(px: number, options: PxToUnitOptions): number {
  const { type, base = 100, precision = 2 } = options;

  let result = 0;

  switch (type) {
    case "vh":
      result = (px / DESIGN_HEIGHT) * 100;
      break;
    case "vw":
      result = (px / DESIGN_WIDTH) * 100;
      break;
    case "%":
      result = (px / base) * 100;
      break;
    default:
      throw new Error("지원하지 않는 단위입니다.");
  }

  return parseFloat(result.toFixed(precision));
}
