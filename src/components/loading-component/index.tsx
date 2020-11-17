import React, { memo } from 'react';
import { Spin } from 'antd';

function Loading() {
  return (
    <div className="flexbox">
      <Spin tip="组件加载中..." />
    </div>
  );
}

export default memo(Loading);
