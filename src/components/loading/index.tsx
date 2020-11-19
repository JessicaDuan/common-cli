import React, { FC, memo } from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin';

const Loading: FC<SpinProps> = (props) => {
  return (
    <div className="flexbox">
      <Spin tip="加载中..." {...props} />
    </div>
  );
};

export default memo(Loading);
