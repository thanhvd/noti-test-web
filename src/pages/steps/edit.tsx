import { DATETIME_FORMAT } from "@/utilities";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { DatePicker, Form, Input, Select } from "antd";
import React from "react";

export const StepsEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});
  const { selectProps: scenarioSelectProps } = useSelect({
    resource: "scenarios",
    optionLabel: "name"
  })

  const { selectProps: templateSelectProps } = useSelect({
    resource: "templates",
    optionLabel: "title"
  })
  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Channel"}
          name={["channel"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Scenario"}
          name={["scenarioId"]}
        >
          <Select {...scenarioSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Priority"}
          name={["priority"]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={"Template"}
          name={["templateId"]}
        >
          <Select {...templateSelectProps} />
        </Form.Item>
        <Form.Item
          label={"NextStep"}
          name={["nextStepId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"PrevStep"}
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
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"DelayRetryHour"}
          name={["delayRetryHour"]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"DelayRetryMin"}
          name={["delayRetryMin"]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"DelayRetrySecond"}
          name={["delayRetrySecond"]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeHour"}
          name={["responseTimeHour"]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeMin"}
          name={["responseTimeMin"]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label={"ResponseTimeSecond"}
          name={["responseTimeSecond"]}
        >
          <Input type="number" />
        </Form.Item>
        {/* <Form.Item
          label={"SentTime"}
          name={["sentTime"]}
        >
          <DatePicker showTime format={DATETIME_FORMAT} />
        </Form.Item> */}
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
    </Edit>
  );
};
