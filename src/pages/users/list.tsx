/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps, useLink } from "@refinedev/core";
import { Button, Space, Table } from "antd";
import { getValueFromEvent } from "@refinedev/antd";
import { Upload, Form } from "antd";
import { NOTIAPI_URL } from "@/utilities";
import { MessageOutlined, ScheduleOutlined } from "@ant-design/icons";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const Link = useLink();

  return (
    <>
      <List>
        <Form>
          <Form.Item label="File">
            <Form.Item
              name="file"
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              noStyle
            >
              <Upload.Dragger
                name="file"
                action={`${NOTIAPI_URL}/group/import/excel`}
                listType="picture"
                maxCount={5}
                multiple
              >
                <p className="ant-upload-text">
                  Drag & drop a file in this area
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title={"ID"} />
          <Table.Column dataIndex="email" title={"Email"} />
          <Table.Column dataIndex="phoneNumber" title={"Phone Number"} />
          <Table.Column dataIndex="status" title={"Status"} />
          <Table.Column dataIndex="username" title={"Username"} />
          <Table.Column dataIndex="deviceType" title={"Device Type"} />
          <Table.Column
            dataIndex={["createdAt"]}
            title={"Created at"}
            render={(value: any) => <DateField value={value} />}
          />
          <Table.Column
            title={"Actions"}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <Link to={`/user-messages/${record.id}`}>
                  <Button size="small" icon={<MessageOutlined />} />
                </Link>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </>
  );
};
