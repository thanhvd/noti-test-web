import {
  DateField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export const MessagesShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Deleted At"}</Title>
      <TextField value={record?.deletedAt} />
      <Title level={5}>{"ScenarioId"}</Title>
      <TextField value={record?.scenarioId} />
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{"StepId"}</Title>
      <TextField value={record?.stepId} />
      <Title level={5}>{"UserId"}</Title>
      <TextField value={record?.userId} />
      <Title level={5}>{"GroupId"}</Title>
      <TextField value={record?.groupId} />
      <Title level={5}>{"TemplateId"}</Title>
      <TextField value={record?.templateId} />
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
