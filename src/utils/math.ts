// 获取[min, max]范围内的随机整数
export const getRandomInteger = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);
