import {
  DateField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { IResourceComponentsProps, useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export const MessagesShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: scenarioData, isLoading: scenarioIsLoading } = useOne({
    resource: "scenarios",
    id: record?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: templateData, isLoading: templateIsLoading } = useOne({
    resource: "templates",
    id: record?.templateId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: "users",
    id: record?.userId || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: groupData, isLoading: groupIsLoading } = useOne({
    resource: "groupUsers",
    id: record?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });
  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"DeletedAt"}</Title>
      <TextField value={record?.deletedAt} />
      <Title level={5}>{"Scenario"}</Title>
      <TextField value={
        scenarioIsLoading ? <>Loading...</> : <>{scenarioData?.data?.name}</>
      } />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{"Step"}</Title>
      <TextField value={record?.stepId} />
      <Title level={5}>{"User"}</Title>
      <TextField value={
        userIsLoading ? <>Loading...</> : <>{userData?.data?.email}</>
      } />
      <Title level={5}>{"Group"}</Title>
      <TextField value={
        groupIsLoading ? <>Loading...</> : <>{groupData?.data?.name}</>
      } />
      <Title level={5}>{"Template"}</Title>
      <TextField value={
        templateIsLoading ? <>Loading...</> : <>{templateData?.data?.title}</>
      } />
      <Title level={5}>{"Topic"}</Title>
      <TextField value={record?.topic} />
      <Title level={5}>{"Channel"}</Title>
      <TextField value={record?.channelAvails} />
      <Title level={5}>{"SentTime"}</Title>
      <TextField value={record?.sentTime} />
      <Title level={5}>{"SentBy"}</Title>
      <TextField value={record?.sentBy} />
      <Title level={5}>{"ReasonFail"}</Title>
      <TextField value={record?.reasonFail} />

    </Show>
  );
};
