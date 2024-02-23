/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps, useMany } from "@refinedev/core";
import { Space, Table } from "antd";
import React from "react";

export const MessagesList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: scenarioData, isLoading: scenarioIsLoading } = useMany({
    resource: "scenarios",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.scenarioId)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: "users",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.userId)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: groupData, isLoading: groupIsLoading } = useMany({
    resource: "groupUsers",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.groupId)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: templateData, isLoading: templateIsLoading } = useMany({
    resource: "templates",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.templateId)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
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
        <Table.Column
          dataIndex="scenarioId"
          title={"Scenario"}
          render={(value) =>
            scenarioIsLoading ? (
              <>Loading...</>
            ) : (
              scenarioData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column dataIndex="stepId" title={"Step"} />
        <Table.Column
          dataIndex="userId"
          title={"User"}
          render={(value) =>
            userIsLoading ? (
              <>Loading...</>
            ) : (
              userData?.data?.find((item) => item.id === value)?.email
            )
          }

        />
        <Table.Column
          dataIndex="groupId"
          title={"Group"}
          render={(value) =>
            groupIsLoading ? (
              <>Loading...</>
            ) : (
              groupData?.data?.find((item) => item.id === value)?.name
            )
          }
        />
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
