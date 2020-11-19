import React, { FC, memo } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styles from '../../index.module.less';

interface ResizeDragBarProps {
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrag: (movementX: number) => void;
}

const ResizeDragBar: FC<ResizeDragBarProps> = ({ onDrag: onUpperDrag, onDragStart, onDragEnd }) => {
  const onDrag = (event: DraggableEvent, ui: DraggableData) => {
    onUpperDrag(ui.x);
  };

  return (
    <Draggable
      axis="x"
      onStart={onDragStart}
      onDrag={onDrag}
      onStop={onDragEnd}
      position={{ x: 0, y: 0 }}
      defaultClassName={styles['']}
      defaultClassNameDragging={styles.dragging}
    >
      <div className={styles['resize-drag-bar']} />
    </Draggable>
  );
};

export default memo(ResizeDragBar);
