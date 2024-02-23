import { Create, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export const MessagesCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({});
  const { selectProps: scenarioSelectProps } = useSelect({
    resource: "scenarios",
    optionLabel: "name"
  })
  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email"
  })
  const { selectProps: groupSelectProps } = useSelect({
    resource: "groupUsers",
    optionLabel: "name"
  })
  const { selectProps: templateSelectProps } = useSelect({
    resource: "templates",
    optionLabel: "title"
  })
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Scenario"}
          name={["scenarioId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...scenarioSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Step"}
          name={["stepId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"User"}
          name={["userId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Group"}
          name={["groupId"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...groupSelectProps} />
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
          <Select {...templateSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Topic"}
          name={["topic"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          label={"SentBy"}
          name={["sentBy"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ReasonFail"}
          name={["reasonFail"]}
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
