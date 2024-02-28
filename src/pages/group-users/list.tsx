/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from '@refinedev/antd';
import {
  BaseRecord,
  IResourceComponentsProps,
  useList,
  useMany,
} from '@refinedev/core';
import { Space, Table } from 'antd';
import React, { useEffect } from 'react';

export const GroupUserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: groupDetails } = useList({
    resource: 'groupDetails',
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: 'user',
    ids:
      tableProps?.dataSource?.map((item) => item?.userId).filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource?.length,
    },
  });

  // const { data: users } = useMany({
  //   resource: "users",
  //   ids: groupDetails?.data.map((groupDetail) => groupDetail.userId),
  //   queryOptions: {
  //     enabled: groupDetails!.length > 0,
  //   },
  // });

  return (
    <List>
      <Table {...tableProps} rowKey='id'>
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
        <Table.Column dataIndex='name' title={'Name'} />
        <Table.Column dataIndex='topic' title={'Topic'} />
        <Table.Column dataIndex='channelAvails' title={'Channel Available'} />
        <Table.Column
          dataIndex={'userId'}
          title={'User'}
          render={(value) =>
            userIsLoading ? (
              <>Loading...</>
            ) : (
              userData?.data?.find((item) => item.id === value)?.email
            )
          }
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
