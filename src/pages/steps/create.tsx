import { DATETIME_FORMAT } from "@/utilities";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { DatePicker, Form, Input, Select } from "antd";
import React from "react";

export const StepsCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: scenarioProps } = useSelect({
    resource: "scenarios",
    optionLabel: "name"
  })

  const { selectProps: templateProps } = useSelect({
    resource: "templates",
    optionLabel: "title"
  })
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Channel"}
          name={["channel"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Scenario"}
          name={["scenarioId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...scenarioProps} />
        </Form.Item>
        <Form.Item
          label={"Priority"}
          name={["priority"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Template"}
          name={["templateId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...templateProps} />
        </Form.Item>
        <Form.Item
          label={"NextStep"}
          name={["nextStepId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"PrevStep"}
          name={["prevStepId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ChannelData"}
          name={["channelData "]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"NumberRetry"}
          name={["numberRetry "]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"DelayRetryHour"}
          name={["delayRet ryHour"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"DelayRetryMin"}
          name={["delayRetr yMin"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"DelayRetrySecond"}
          name={["delayR etrySecond"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeHour"}
          name={["respon seTimeHour"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeMin"}
          name={["respons eTimeMin"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeSecond"}
          name={["resp onseTimeSecond"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"SentTime"}
          name={["sentTime"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker showTime format={DATETIME_FORMAT} />
        </Form.Item>
        <Form.Item
          label={"IsFailOver"}
          name={["isFailOver"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"GroupCode"}
          name={["groupCode"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"GroupName"}
          name={["groupName"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
