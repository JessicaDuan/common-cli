import React, { FC, memo, useEffect } from 'react';
import useDrag from './useDrag';
import styles from './index.module.less';

interface ResizeDragBarProps {
  onDragStart: () => void;
  onDrag: (movementX: number) => void;
}

const ResizeDragBar: FC<ResizeDragBarProps> = ({ onDrag, onDragStart: beforeDragStart }) => {
  const { movementX, dragProps } = useDrag();

  useEffect(() => {
    if (movementX) {
      onDrag(movementX);
    }
  }, [movementX, onDrag]);

  return (
    <div
      className={styles['resize-drag-bar']}
      draggable
      {...dragProps}
      onDragStart={(e) => {
        beforeDragStart();
        dragProps.onDragStart(e);
      }}
    />
  );
};

export default memo(ResizeDragBar);
