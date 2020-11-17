import { cloneDeep } from 'lodash';
import { ColorSetting, ColorSettingOperation, ColorSettingValue } from './type';

/**
 * 判断是否满足规则
 * @param a 比较值1
 * @param b 比较值2
 * @param op 操作符
 */
const matchRule = (a: string | number, b: ColorSettingValue, op: ColorSettingOperation) => {
  if (op === '>') return a > b;
  if (op === '>=') return a >= b;
  if (op === '==') return a === b;
  if (op === '!=') return a !== b;
  if (op === '<') return a < b;
  if (op === '<=') return a <= b;
  if (op === 'range') {
    const [min, max] = b as [number, number];
    return a >= min && a <= max;
  }
  return false;
};

/**
 * 按优先级从低到高的顺序重排表格着色规则
 * @param colorSettings
 */
const sortByPriority = (colorSettings: ColorSetting[]) => {
  const settings = cloneDeep(colorSettings);
  settings.sort((a, b) => {
    if (a.type === 'single' && b.type !== 'single') return 1;
    if (a.type === b.type) return 0;
    return -1;
  });
  return settings;
};

/**
 * 计算当前单元格颜色
 */
export const getColor = (colorSettings: ColorSetting[], key: string, record: any) => {
  let textColor: string | undefined;
  const settings = sortByPriority(colorSettings);
  settings.forEach((setting) => {
    const { type, col, op, val, color } = setting;
    if (type === 'single' && col === key) {
      // 当前key存在单值匹配规则
      if (matchRule(record[key], val, op)) {
        textColor = color;
      }
    } else if (type === 'line') {
      // 整行匹配规则
      if (matchRule(record[col], val, op)) {
        textColor = color;
      }
    }
  });
  return textColor;
};
