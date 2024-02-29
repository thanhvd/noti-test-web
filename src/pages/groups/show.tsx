import { DateField, NumberField, Show, TextField } from '@refinedev/antd';
import { IResourceComponentsProps, useShow } from '@refinedev/core';
import { Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const GroupShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{'ID'}</Title>
      <NumberField value={record?.id ?? ''} />
      <Title level={5}>{'CreatedAt'}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{'Deleted At'}</Title>
      <TextField value={record?.deletedAt} />
      <Title level={5}>{'Updated At'}</Title>
      <TextField value={record?.updatedAt} />
      <Title level={5}>{'Name'}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{'Topic'}</Title>
      <TextField value={record?.topic} />
      <Title level={5}>{'Channel Available'}</Title>
      <TextField value={record?.channelAvails} />
    </Show>
  );
};
