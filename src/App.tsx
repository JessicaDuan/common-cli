import React, { useState } from 'react';
import { Button, Space } from 'antd';
import Table from '@/components/table';
import { Column } from './components/table/type';
import { getRandomInteger } from './utils';

const colorSetting = [
  {
    type: 'single',
    col: 'benefit',
    op: '>',
    val: 0,
    color: 'green',
  },
  {
    type: 'single',
    col: 'benefit',
    op: '<',
    val: 0,
    color: 'red',
  },
  {
    type: 'line',
    col: 'login_count',
    op: '>',
    val: 50,
    color: 'blue',
  },
  {
    type: 'line',
    col: 'login_count',
    op: '<=',
    val: 50,
    color: '#999',
  },
].sort((a, b) => {
  if (a.type === 'single' && b.type !== 'single') return 1;
  if (a.type === b.type) return 0;
  return -1;
});

const matchRule = (a: any, b: any, op: string) => {
  // eslint-disable-next-line no-eval
  return eval(`${a}${op}${b}`);
};

const getColor = (key: string, record: any) => {
  let textColor: string | undefined;
  colorSetting.forEach((setting) => {
    const { type, col, op, val, color } = setting;
    if (type === 'single' && col === key) {
      // 当前key存在单值匹配规则
      if (matchRule(record[key], val, op)) {
        textColor = color;
      }
    } else if (type === 'line') {
      // 整行匹配规则
      if (matchRule(record[col], val, op)) {
        textColor = color;
      }
    }
  });
  return textColor;
};

const getRender = (key: string, record: any) => {
  const text = record[key];
  const color = getColor(key, record);
  return <span style={{ color }}>{text}</span>;
};

const App = () => {
  const columns: Column[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      fixed: 'left',
      sorter: true,
      render: (_: unknown, record: any) => getRender('id', record),
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: '描述',
      render: (_: unknown, record: any) => getRender('description', record),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '名称',
      fixed: 'left',
      render: (_: unknown, record: any) => getRender('name', record),
    },
    {
      key: 'benefit',
      dataIndex: 'benefit',
      title: '利润',
      showScaleBar: true,
      align: 'right',
      sorter: true,
      render: (_: unknown, record: any) => getRender('benefit', record),
    },
    {
      key: 'test',
      title: 'no dataIndex',
      fixed: 'right',
      render: () => {
        return 'haha';
      },
    },
    {
      key: 'login_count',
      dataIndex: 'login_count',
      title: '登陆次数',
      showScaleBar: true,
      align: 'right',
      sorter: true,
      render: (_: unknown, record: any) => getRender('login_count', record),
    },
  ];

  const dataSource = Array.from(new Array(10000)).map((o, idx) => {
    return {
      id: idx + 1,
      name: `test${idx + 1}`,
      description: `descsafasfasdfasdfasdfsadfasf dfasfasdfasd dsfadsfasdfasdf adsfadsfasd${idx + 1}`,
      benefit: getRandomInteger(-500, 1000),
      login_count: String(getRandomInteger(0, 100)),
    };
  });

  const [ds, setDs] = useState(dataSource);

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 8 }}>
        <Button onClick={() => setDs(dataSource)}>set</Button>
        <Button onClick={() => setDs([])}>clear</Button>
      </Space>
      <Table rowKey="id" columns={columns} dataSource={ds} height={300} debug />
    </div>
  );
};

export default App;
