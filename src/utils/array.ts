/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEmpty } from './type';

/**
 * 从列表[arr]中找到[key]值为[value]的[labelKey]值
 * @param arr 要搜索的源数组
 * @param value 要搜索的目标值
 * @param key
 * @param labelKey 为空时返回找到的整个对象，否则返回对象中key=labelKey的值
 * @param returnOriginIfNull default: true，如没找到是否返回原值，否则返回null
 */
export function findValueInList(
  arr: any[],
  value: string | number,
  key: string,
  labelKey: string,
  returnOriginIfNull = true
) {
  const obj = arr.find((o) => o[key] === value);
  if (obj) {
    return labelKey ? obj[labelKey] : obj;
  }
  return returnOriginIfNull ? value : null;
}

/**
 * 数据排序：正序
 * @param a 排序的对象a
 * @param b 排序的对象b
 * @param attr 对象中要比较的属性（可以为key，也可以为数组下标）
 */
export function sortAsc(a: any, b: any, attr: number | string) {
  const x = isEmpty(attr) ? a : a[attr];
  const y = isEmpty(attr) ? b : b[attr];
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}

/**
 * 数据排序：倒序
 * @param a 排序的对象a
 * @param b 排序的对象b
 * @param attr 对象中要比较的属性（可以为key，也可以为数组下标）
 */
export function sortDesc(a: any, b: any, attr: number | string) {
  const x = isEmpty(attr) ? a : a[attr];
  const y = isEmpty(attr) ? b : b[attr];
  if (x < y) {
    return 1;
  }
  if (x > y) {
    return -1;
  }
  return 0;
}

/**
 * 数组去重
 * @param origData
 */
export function getDistinct(origData: Array<any>) {
  return Array.from(new Set(origData));
}

/**
 * 多列排序
 * @param data
 * @param settings
 */
export function multiSort(data: Array<Array<number>>, settings: { key: number; isAsc: boolean }[]) {
  // 样例数据
  // const data = [
  //   [1, 2, 3, 4],
  //   [1, 3, 3, 4],
  //   [2, 2, 4, 4],
  //   [2, 3, 3, 4],
  // ];
  // const settings = [
  //   { key: 0, isAsc: false },
  //   { key: 1, isAsc: true },
  //   { key: 2, isAsc: true },
  // ];
  const settingsCount = settings.length;
  const sort: (a: Array<number>, b: Array<number>, idx: number) => number = (a, b, idx) => {
    const setting = settings[idx];
    const { key, isAsc } = setting;
    if (a[key] === b[key]) {
      if (idx + 1 < settingsCount) {
        return sort(a, b, idx + 1);
      }
      return 0;
    }
    if (isAsc) {
      if (a[key] > b[key]) return 1;
      if (a[key] < b[key]) return -1;
      return 0;
    }
    if (a[key] > b[key]) return -1;
    if (a[key] < b[key]) return 1;
    return 0;
  };
  return [...data].sort((a, b) => sort(a, b, 0));
}
