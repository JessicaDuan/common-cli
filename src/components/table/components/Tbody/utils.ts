import { isEmpty } from '@/utils';

const BLUE = 'rgba(199, 248, 255, 0.5)';
const RED = 'rgba(255, 204, 199, 0.5)';
const GREEN = 'rgba(217, 247, 190, 0.5)';

export const getBgStyle = ({ min, max, current }: { min: number; max: number; current: number }) => {
  if (isEmpty(min) || isEmpty(max) || isEmpty(current)) return undefined;

  let bgScaleStyle: string;
  const percentage = Math.round(((current - min) / (max - min)) * 100);
  if (min >= 0) {
    bgScaleStyle = `linear-gradient(to right, ${BLUE} ${percentage}%, transparent ${percentage}%)`;
  } else {
    const zeroPercentage = Math.round(((0 - min) / (max - min)) * 100);
    if (current < 0) {
      bgScaleStyle = `linear-gradient(to right, transparent ${percentage}%, ${RED} ${percentage}%, ${RED} ${zeroPercentage}%, transparent ${zeroPercentage}%)`;
    } else {
      bgScaleStyle = `linear-gradient(to right, transparent ${zeroPercentage}%, ${GREEN} ${zeroPercentage}%, ${GREEN} ${percentage}%, transparent ${percentage}%)`;
    }
  }
  return bgScaleStyle;
};
