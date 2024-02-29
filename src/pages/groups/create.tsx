import { Create, useForm, useSelect } from '@refinedev/antd';
import { CrudFilters, IResourceComponentsProps } from '@refinedev/core';
import { Form, Input, Select } from 'antd';
import React from 'react';

export const GroupCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({});

  // const groupData = queryResult?.data?.data;

  // const { selectProps: userSelectProps } = useSelect({
  //   resource: 'user',
  //   optionLabel: 'email',
  //   queryOptions: {},
  //   // filters: ['email'],
  //   // defaultValue: groupData?.category?.id,
  //   // queryOptions: {
  //   //   enabled: !!groupData?.category?.id,
  //   // },
  //   onSearch: (value) => {
  //     const filters: CrudFilters = [];
  //     filters.push({
  //       field: 'email',
  //       operator: 'eq',
  //       value: value,
  //     });

  //     return filters;
  //   },
  // });

  return (
    <Create saveButtonProps={saveButtonProps}>
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
        {/* <Form.Item label='User' name={['User', 'id']}>
          <Select
            {...userSelectProps}
            // mode='multiple'
            showSearch
            allowClear
            autoClearSearchValue={true}
          />
        </Form.Item> */}
        {/* <Form.Item
          label={"Topic"}
          name={["topic"]}
          initialValue={"active"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"active"}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item> */}
      </Form>
    </Create>
  );
};
