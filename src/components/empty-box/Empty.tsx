import React, { memo, FC, ReactNode } from 'react';
import { Empty as AntdEmpty } from 'antd';
import EmptySvg from '@/assets/empty.svg';

interface Props {
  description?: ReactNode;
  height?: number;
}

const Empty: FC<Props> = ({ description, height }) => {
  return (
    <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AntdEmpty
        image={EmptySvg}
        imageStyle={{ height: 60 }}
        description={<span style={{ color: 'rgba(0, 0, 0, 0.5)' }}>{description ?? '暂无数据'}</span>}
      />
    </div>
  );
};

export default memo(Empty);
