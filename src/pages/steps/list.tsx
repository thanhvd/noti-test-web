/* eslint-disable @typescript-eslint/no-explicit-any */
import { MessageOutlined } from "@ant-design/icons";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import {
  BaseRecord,
  IResourceComponentsProps,
  useLink,
  useMany,
} from "@refinedev/core";
import { Button, Space, Table } from "antd";
import React from "react";

export const StepsList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: templateData, isLoading: templateIsLoading } = useMany({
    resource: "templates",
    ids:
      tableProps?.dataSource?.map((item) => item?.templateId).filter(Boolean) ??
      [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const Link = useLink();

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
        <Table.Column dataIndex="channel" title={"Channel"} />
        <Table.Column dataIndex="priority" title={"Priority"} />
        <Table.Column
          dataIndex="templateId"
          title={"Template"}
          render={(value) =>
            templateIsLoading ? (
              <>Loading...</>
            ) : (
              templateData?.data?.find((item) => item.id === value)?.title
            )
          }
        />
        <Table.Column dataIndex="nextStepId" title={"NextStep"} />
        <Table.Column dataIndex="prevStepId" title={"PrevStep"} />
        <Table.Column dataIndex="channelData" title={"ChannelData"} />
        <Table.Column dataIndex="numberRetry" title={"NumberRetry"} />
        <Table.Column dataIndex="delayRetryHour" title={"DelayRetryHour"} />
        <Table.Column dataIndex="delayRetryMin" title={"DelayRetryMinute"} />
        <Table.Column dataIndex="delayRetrySecond" title={"DelayRetrySecond"} />
        <Table.Column dataIndex="responseTimeHour" title={"ResponseTimeHour"} />
        <Table.Column dataIndex="responseTimeMin" title={"ResonseTimeMinute"} />
        <Table.Column
          dataIndex="responseTimeSecond"
          title={"ResponseTimeSecond"}
        />
        <Table.Column dataIndex="sentTime" title={"SentTime"} />
        <Table.Column dataIndex="isFailOver" title={"IsFailOver"} />
        <Table.Column dataIndex="groupCode" title={"GroupCode"} />
        <Table.Column dataIndex="groupName" title={"GroupName"} />

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
