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
import { Space, Table } from "antd";
import React from "react";

export const MessagesList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column
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
        />
        <Table.Column dataIndex="scenarioId" title={"ScenarioId"} />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column dataIndex="stepId" title={"StepId"} />
        <Table.Column dataIndex="userId" title={"UserId"} />
        <Table.Column dataIndex="groupId" title={"GroupId"} />
        <Table.Column dataIndex="templateId" title={"TemplateId"} />
        <Table.Column dataIndex="topic" title={"Topic"} />
        <Table.Column dataIndex="channel" title={"Channel"} />
        <Table.Column
          dataIndex={["sentTime"]}
          title={"SentTime"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex="sentBy" title={"SentBy"} />
        <Table.Column dataIndex="reasonFail" title={"ReasonFail"} />


        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
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
