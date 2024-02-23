import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export const MessagesEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
      <Form.Item
          label={"ScenarioId"}
          name={["scenarioId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Status"}
          name={["status"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"StepId"}
          name={["stepId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"SserId"}
          name={["userId"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"GroupId"}
          name={["groupId"]}
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
