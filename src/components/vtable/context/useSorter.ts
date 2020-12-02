import { useCallback, useState } from 'react';
import { Direction, Sorter } from '../type';

function getNextDirection(current: Direction) {
  const directionList: Direction[] = ['asc', 'desc', undefined];
  const idx = directionList.indexOf(current);
  const nextIdx = (idx + 1) % directionList.length;
  return directionList[nextIdx];
}

interface SorterProps {
  sorter: Sorter | undefined;
  changeSorter: (k: string) => void;
}

export default function useSorter(): SorterProps {
  const [sorter, setSorter] = useState<Sorter | undefined>();

  const changeSorter = useCallback((k: string) => {
    setSorter((prev) => {
      if (prev?.key !== k) {
        return { key: k, direction: getNextDirection(undefined) };
      }
      return { key: k, direction: getNextDirection(prev?.direction) };
    });
  }, []);

  return { sorter, changeSorter };
}
