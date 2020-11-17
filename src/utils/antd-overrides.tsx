/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentClass } from 'react';
import { Spin, Input, InputNumber, Select, Table, Modal } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { TableProps } from 'antd/lib/table';
import { ModalProps } from 'antd/lib/modal';
import Loading from '@/components/loading-component';

// 自定义全局Spin图标
Spin.setDefaultIndicator(<Loading />);

// 全局设置place holder
(Input.defaultProps as InputProps).placeholder = '请输入';
(Input.TextArea as ComponentClass).defaultProps = {
  ...(Input.TextArea as ComponentClass).defaultProps,
  placeholder: '请输入',
} as TextAreaProps;
(InputNumber.defaultProps as InputNumberProps).placeholder = '请输入数字';

// @ts-ignore
if (!Select.defaultProps) {
  // @ts-ignore
  Select.defaultProps = {
    placeholder: '请选择',
    optionFilterProp: 'children',
    showSearch: true,
    showArrow: true,
    getPopupContainer: (triggerNode: HTMLElement) => {
      if (triggerNode) {
        return (triggerNode.parentNode as HTMLElement) ?? document.body;
      }
      return document.body;
    },
  };
}

Table.defaultProps.rowKey = 'id';
(Table.defaultProps as TableProps<unknown>).size = 'small';

(Modal.defaultProps as ModalProps).maskClosable = false;
