/* eslint-disable @typescript-eslint/no-explicit-any */
import PlayIcon from "@/components/icon/PlayIcon";
import { ScheduleOutlined } from "@ant-design/icons";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { BaseRecord, IResourceComponentsProps, useLink, useMany } from "@refinedev/core";
import { Button, Modal, Space, Table } from "antd";
import React, { useState } from "react";
import { EditStart } from "../scenario-config/components/kanban-card-item/EditStart";
import { DATETIME_FORMAT, DATE_FORMAT } from "@/utilities";

export const ScenarioList: React.FC<IResourceComponentsProps> = () => {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const [scenarioData, setScenarioData] = useState(tableProps.dataSource)
  const Link = useLink();

  const { data: groupData, isLoading: groupIsLoading } = useMany({
    resource: "group",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.groupId)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource?.length,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useMany({
    resource: "user",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.userId)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource?.length,
    },
  });

  const showStartModal = () => {
    setIsStartModalOpen(true);
  };

  const handleOk = () => {
    setIsStartModalOpen(false);
  };

  const handleCancel = () => {
    setIsStartModalOpen(false);
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column
          dataIndex={"groupId"}
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
          dataIndex={"userId"}
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
          title={"Statistics"}
          dataIndex="statistics"
          render={(_, record: BaseRecord) => (
            <div style={{ fontSize: 12 }}>
              {`Email:  ${record.successEmail}`}
              <br />
              {`Notification:  ${record.successPush}`}
              <br />
              {`SMS:  ${record.successSMS}`}
              <br />
            </div>
          )}
        />
        <Table.Column
          dataIndex={["startTime"]}
          title={"Start Time"}
          render={(value: any) => <DateField value={value} format={DATETIME_FORMAT} />}
        />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} format={DATE_FORMAT} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <Link to={`/scenarios/config/${record.id}`}>
                <Button size="small" icon={<ScheduleOutlined />} />
              </Link>
              {/* <EditButton hideText size="small" recordItemId={record.id} /> */}
              <ShowButton hideText size="small" recordItemId={record.id} />
              <Button size="small"><PlayIcon style={{ marginTop: "4px" }} width={10} height={15} onClick={showStartModal} /></Button>
              {/* <DeleteButton hideText size="small" recordItemId={record.id} /> */}
            </Space>
          )}
        />
      </Table>
      <EditStart open={isStartModalOpen} onOk={handleOk} onCancel={handleCancel} scenarioData={scenarioData} setScenarioData={setScenarioData} />
    </List>

  );
};
