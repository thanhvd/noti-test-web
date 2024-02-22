import { Create, useForm } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Select } from "antd";
import React from "react";

export const GroupUserCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

        <Form.Item
          label={"Name"}
          name={["name"]}
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
          label={"Channel Available"}
          name={["channelAvails"]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label={"Topic"}
          name={["topic"]}
          initialValue={"active"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"active"}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item> */}
      </Form>
    </Create>
  );
};
