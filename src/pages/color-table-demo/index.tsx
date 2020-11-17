import React from 'react';
import Table from '@/components/table';
import { Column } from '@/components/table/type';
import { getRandomInteger } from '@/utils';
import { getColor } from './utils';
import { ColorSetting } from './type';

const colorSettings: ColorSetting[] = [
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
];

const getRender = (key: string, record: any) => {
  const text = record[key];
  const color = getColor(colorSettings, key, record);
  return <span style={{ color }}>{text}</span>;
};

const ColorTable = () => {
  const origColumns: Column[] = [
    {
      key: 'id',
      dataIndex: 'id',
      title: 'ID',
      fixed: 'left',
      sorter: true,
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: '描述',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: '名称',
      fixed: 'left',
    },
    {
      key: 'benefit',
      dataIndex: 'benefit',
      title: '利润',
      showScaleBar: true,
      align: 'right',
      sorter: true,
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
    },
  ];

  const columns: Column[] = origColumns.map((col) => ({
    ...col,
    render: col.dataIndex ? (_: unknown, record: any) => getRender(col.dataIndex as string, record) : col.render,
  }));

  const dataSource = Array.from(new Array(10000)).map((o, idx) => {
    return {
      id: idx + 1,
      name: `test${idx + 1}`,
      description: `descsafasfasdfasdfasdfsadfasf dfasfasdfasd dsfadsfasdfasdf adsfadsfasd${idx + 1}`,
      benefit: getRandomInteger(-500, 1000),
      login_count: String(getRandomInteger(0, 100)),
    };
  });

  return (
    <div style={{ padding: 24 }}>
      <Table rowKey="id" columns={columns} dataSource={dataSource} height={300} debug />
    </div>
  );
};

export default ColorTable;
