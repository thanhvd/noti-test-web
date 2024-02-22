import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export const EmailVendorsEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Hostname"}
          name={["hostName"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Port"}
          name={["port"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Username"}
          name={["userName"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name={["password"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Priority"}
          name={["priority"]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
