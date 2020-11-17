export type ColorSettingType = 'single' | 'line';

export type ColorSettingOperation = '>' | '>=' | '==' | '!=' | '<' | '<=' | 'range';

export type ColorSettingValue = number | [number, number];

interface BasicColorSetting {
  type: ColorSettingType;
  col: string;
  color: string;
}

export interface RangeColorSetting extends BasicColorSetting {
  op: 'range';
  val: [number, number];
}

export interface CommonColorSetting extends BasicColorSetting {
  op: Exclude<ColorSettingOperation, 'range'>;
  val: number;
}

export type ColorSetting = RangeColorSetting | CommonColorSetting;
