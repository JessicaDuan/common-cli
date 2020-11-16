/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentClass } from 'react';
import { Spin, Input, InputNumber, Select, Table, Modal } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { SelectProps } from 'antd/lib/select';
import { TableProps } from 'antd/lib/table';
import { ModalProps } from 'antd/lib/modal';
import Loading from '@/components/Loading';

// 自定义全局Spin图标
Spin.setDefaultIndicator(<Loading />);

// 全局设置place holder
(Input.defaultProps as InputProps).placeholder = '请输入';
(Input.TextArea as ComponentClass).defaultProps = {
  ...(Input.TextArea as ComponentClass).defaultProps,
  placeholder: '请输入',
} as TextAreaProps;
(InputNumber.defaultProps as InputNumberProps).placeholder = '请输入数字';

if (!(Select as any).defaultProps) (Select as any).defaultProps = {};

((Select as any).defaultProps as SelectProps<string>).placeholder = '请选择';

// 选择框默认搜索内容为展示元素
((Select as any).defaultProps as SelectProps<string>).optionFilterProp = 'children';
((Select as any).defaultProps as SelectProps<string>).showSearch = true;
((Select as any).defaultProps as SelectProps<string>).showArrow = true;
((Select as any).defaultProps as SelectProps<string>).getPopupContainer = (triggerNode: HTMLElement) => {
  if (triggerNode) {
    return (triggerNode.parentNode as HTMLElement) ?? document.body;
  }
  return document.body;
};

Table.defaultProps.rowKey = 'id';
(Table.defaultProps as TableProps<unknown>).size = 'small';

(Modal.defaultProps as ModalProps).maskClosable = false;
