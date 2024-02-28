import { Edit, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import MDEditor from "@uiw/react-md-editor";
import { Form, Input } from "antd";
import React from "react";

export const TemplateEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, formLoading } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={"Channel"} name={["channel"]}>
          <Input />
        </Form.Item>
        <Form.Item label={"Title"} name={["title"]}>
          <Input />
        </Form.Item>
        <Form.Item label={"Content"} name={["content"]}>
          <MDEditor data-color-mode="light" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
