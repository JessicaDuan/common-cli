import numeral from 'numeral';

/*
 * 返回格式化后的结果
 * @param {*} num: 原始数据
 * @param {*} format: 合法的numeral支持的format格式
 */
export function getFormattedNumber(num: number, format: string) {
  return numeral(num).format(format);
}
