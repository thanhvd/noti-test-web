import { Create, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export const StepsCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Channel"}
          name={["channel"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ScenarioId"}
          name={["scenarioId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Priority"}
          name={["priority"]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"TemplateId"}
          name={["templateId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"NextStepId"}
          name={["nextStepId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"PrevStepId"}
          name={["prevStepId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ChannelData"}
          name={["channelData"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"NumberRetry"}
          name={["numberRetry"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"DelayRetryHour"}
          name={["delayRetryHour"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"DelayRetryMin"}
          name={["delayRetryMin"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"DelayRetrySecond"}
          name={["delayRetrySecond"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeHour"}
          name={["responseTimeHour"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeMin"}
          name={["responseTimeMin"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeSecond"}
          name={["responseTimeSecond"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"SentTime"}
          name={["sentTime"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"IsFailOver"}
          name={["isFailOver"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"GroupCode"}
          name={["groupCode"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"GroupName"}
          name={["groupName"]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
