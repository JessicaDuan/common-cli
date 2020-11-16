/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 是否为数组
 * @param value
 */
export function isArray(value: any): value is Array<any> {
  return Array.isArray(value);
}

/**
 * 是否为空
 * @param value
 */
export function isVoid(value: any): value is void {
  return value === undefined || value === null;
}

/**
 * 是否为对象
 * @param value
 */
export function isObject(value: any): value is Record<any, any> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否为方法
 * @param value
 */
export function isFunc(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

/**
 * 是否为字符串
 * @param value
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}

/**
 * 是否为数字
 * @param value
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

/**
 * 广义的变量为空判定(undefined, null, 空字符串, 空数组, 空对象)
 * @param value
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isEmpty(value: any): value is void | '' | [] | {} {
  if (isVoid(value)) {
    return true;
  }
  if (value === '') {
    return true;
  }
  if (isArray(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  return false;
}
