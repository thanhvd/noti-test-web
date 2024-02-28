import { Edit, useForm } from '@refinedev/antd';
import { IResourceComponentsProps } from '@refinedev/core';
import { Form, Input, Select } from 'antd';
import React from 'react';

export const GroupUserEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout='vertical'>
        <Form.Item label={'Name'} name={['name']}>
          <Input />
        </Form.Item>
        <Form.Item label={'Topic'} name={['topic']}>
          <Input />
        </Form.Item>
        <Form.Item label={'Channel Available'} name={['channelAvails']}>
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
