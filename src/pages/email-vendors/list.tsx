/* eslint-disable @typescript-eslint/no-explicit-any */
import { NOTIAPI_URL } from "@/utilities";
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
import axios from "axios";
import React, { useEffect, useState } from "react";

export const EmailVendorsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  console.log("TB PROPS: ", tableProps.dataSource)
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({});
  const [dataSource, setDataSource] = useState<BaseRecord[]>([]);
  const handleChangeStatus = (checked: boolean, id: any) => {
    axios({
      method: "put",
      url: `${NOTIAPI_URL}/email/vendor/${id}/update`,
      data: {
        status: checked === true ? "ACTIVE" : "INACTIVE"
      }
    }).then(() => {
      // Cập nhật trạng thái của switch sau khi API đã được gọi thành công
      setSwitchStates(prevStates => ({
        ...prevStates,
        [id]: checked
      }));

    });
  };

  useEffect(() => {
    // Cập nhật dataSource mới dựa trên switchStates
    const updatedDataSource = tableProps?.dataSource?.map((record: BaseRecord) => ({
      ...record,
      status: switchStates[record.id] ? "ACTIVE" : "INACTIVE"
    }));
    setDataSource(updatedDataSource);
  }, [tableProps.dataSource, switchStates]);

  return (
    <List>
      <Table {...tableProps} dataSource={dataSource} rowKey="id">
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
                checked={switchStates[record.id]}
                onChange={(checked) => handleChangeStatus(checked, record.id)}
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
