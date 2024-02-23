import { Edit, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export const MessagesEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

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
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Scenario"}
          name={["scenarioId"]}
        >
          <Select {...scenarioSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Step"}
          name={["stepId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"User"}
          name={["userId"]}
        >
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Group"}
          name={["groupId"]}
        >
          <Select {...groupSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Template"}
          name={["templateId"]}
        >
          <Select {...templateSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Topic"}
          name={["topic"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Channel"}
          name={["channel"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"SentBy"}
          name={["sentBy"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"ReasonFail"}
          name={["reasonFail"]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
