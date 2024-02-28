/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Space, Switch, Table, notification } from 'antd';
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import {
  BaseRecord,
  IResourceComponentsProps,
  useCustomMutation,
} from '@refinedev/core';
import { NOTIAPI_URL } from '@/utilities';

export const EmailVendorsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, tableQueryResult } = useTable({
    syncWithLocation: true,
  });
  const { mutate, isLoading } = useCustomMutation();

  const handleChangeStatus = async (checked: boolean, id: any) => {
    await mutate(
      {
        method: 'put',
        url: `${NOTIAPI_URL}/email/vendor/${id}/update`,
        values: {
          status: checked === true ? 'ACTIVE' : 'INACTIVE',
        },
      },
      {
        onError: (error, variables, context) => {
          console.log('ERROR');
        },
        onSuccess: (data, variables, context) => {
          notification['success']({
            message: 'Successful',
            description: 'Successfully updated email vendor status',
          });
          tableQueryResult.refetch();
        },
      }
    );
  };

  return (
    <List>
      <Table {...tableProps} dataSource={tableProps?.dataSource} rowKey='id'>
        <Table.Column dataIndex='id' title={'ID'} />
        {/* <Table.Column
          dataIndex={["createdAt"]}
          title={"Created At"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["deletedAt"]}
          title={"Deleted At"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["updatedAt"]}
          title={"Updated At"}
          render={(value: any) => <DateField value={value} />}
        /> */}
        <Table.Column dataIndex='hostName' title={'Hostname'} />
        <Table.Column dataIndex='port' title={'Port'} />
        <Table.Column dataIndex='userName' title={'Username'} />
        {/* <Table.Column dataIndex="password" title={"Password"} /> */}
        <Table.Column dataIndex='priority' title={'Priority'} />
        <Table.Column
          dataIndex='status'
          title={'Status'}
          render={(_, record: BaseRecord) => (
            <Switch
              disabled={isLoading || tableQueryResult.isLoading}
              loading={isLoading || tableQueryResult.isLoading}
              checked={record.status === 'ACTIVE'}
              onChange={(checked) => handleChangeStatus(checked, record.id)}
            />
          )}
        />

        <Table.Column
          title={'Actions'}
          dataIndex='actions'
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record.id} />
              <ShowButton hideText size='small' recordItemId={record.id} />
              <DeleteButton hideText size='small' recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
