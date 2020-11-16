import { useState, DragEvent } from 'react';

export default function useDrag() {
  const [isDragging, setIsDragging] = useState(false);
  const [beginX, setBeginX] = useState(0);
  const [endX, setEndX] = useState(0);

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setBeginX(event.pageX);
    setEndX(event.pageX);
  };

  const onDrag = (event: DragEvent<HTMLDivElement>) => {
    const currentX = event.pageX;
    if (isDragging && currentX !== 0) {
      setEndX(currentX);
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  return {
    movementX: endX - beginX,
    dragProps: {
      onDragStart,
      onDrag,
      onDragEnd,
    },
  };
}
