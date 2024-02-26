/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps } from "@refinedev/core";
import { Select, Space, Switch, Table } from "antd";
import React from "react";

export const EmailVendorsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  // const handleChangeStatus = async (status: string, record: any) => {
  //   try {
  //     await 
  //     } catch (e) {
  //     console.log("error: ", e)
  //   }
  // }

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
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
        <Table.Column dataIndex="hostName" title={"Hostname"} />
        <Table.Column dataIndex="port" title={"Port"} />
        <Table.Column dataIndex="userName" title={"Username"} />
        {/* <Table.Column dataIndex="password" title={"Password"} /> */}
        <Table.Column dataIndex="priority" title={"Priority"} />
        <Table.Column dataIndex="status" title={"Status"} />

        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <Switch
                defaultChecked={record.status}
                onChange={onChange}
              />
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />

            </Space>
          )}
        />
      </Table>
    </List>
  );
};
