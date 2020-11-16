// / <reference types="react-scripts" />
/* 允许在ts中使用import styles from '*.less' */
declare module '*.less' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*.png';
declare module '*.svg';
