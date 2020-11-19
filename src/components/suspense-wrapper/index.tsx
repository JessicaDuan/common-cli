import React, { Suspense, PureComponent } from 'react';
import { toString } from '@/utils';
import { Result } from 'antd';
import Loading from '@/components/loading';

interface State {
  hasError: boolean;
  errorInfo: string;
}

class SuspenseWrapper extends PureComponent {
  state: State = {
    hasError: false,
    errorInfo: '',
  };

  static getDerivedStateFromError(error: Error): Partial<State> | null {
    const errorInfo = toString(error);
    // 版本更新导致加载资源错误时自动刷新
    if (errorInfo.startsWith('ChunkLoadError')) {
      window.location.reload();
    }
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, errorInfo };
  }

  render() {
    const { children } = this.props;
    const { hasError, errorInfo } = this.state;

    if (hasError) {
      return (
        <Result
          status="error"
          title="客户端错误"
          subTitle="请尝试刷新，如问题仍未解决，请联系管理员"
          extra={errorInfo}
        />
      );
    }

    return <Suspense fallback={<Loading />}>{children}</Suspense>;
  }
}

export default SuspenseWrapper;
