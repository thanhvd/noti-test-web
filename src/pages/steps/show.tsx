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

export const StepsShow: React.FC<IResourceComponentsProps> = () => {
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
      <Title level={5}>{"Channel"}</Title>
      <TextField value={record?.channelAvails} />
      <Title level={5}>{"ScenarioId"}</Title>
      <TextField value={record?.scenarioId} />
      <Title level={5}>{"Priority"}</Title>
      <TextField value={record?.priority} />
      <Title level={5}>{"TemplateId"}</Title>
      <TextField value={record?.templateId} />
      <Title level={5}>{"NextStepId"}</Title>
      <TextField value={record?.nextStepId} />
      <Title level={5}>{"PrevStepId"}</Title>
      <TextField value={record?.prevStepId} />
      <Title level={5}>{"ChannelData"}</Title>
      <TextField value={record?.channelData} />
      <Title level={5}>{"NumberRetry"}</Title>
      <TextField value={record?.numberRetry} />
      <Title level={5}>{"DelayRetryHour"}</Title>
      <TextField value={record?.delayRetryHour} />
      <Title level={5}>{"delayRetryMin"}</Title>
      <TextField value={record?.delayRetryMin} />
      <Title level={5}>{"DelayRetrySecond"}</Title>
      <TextField value={record?.delayRetrySecond} />
      <Title level={5}>{"ResponseTimeHour"}</Title>
      <TextField value={record?.responseTimeHour} />
      <Title level={5}>{"ResponseTimeMin"}</Title>
      <TextField value={record?.responseTimeMin} />
      <Title level={5}>{"ResponseTimeSecond"}</Title>
      <TextField value={record?.responseTimeSecond} />
      <Title level={5}>{"SentTime"}</Title>
      <TextField value={record?.sentTime} />
      <Title level={5}>{"IsFailOver"}</Title>
      <TextField value={record?.isFailOver} />
      <Title level={5}>{"GroupCode"}</Title>
      <TextField value={record?.groupCode} />
      <Title level={5}>{"GroupName"}</Title>
      <TextField value={record?.groupName} />

    </Show>
  );
};
