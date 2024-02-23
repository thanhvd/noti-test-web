import { DATETIME_FORMAT } from "@/utilities";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { DatePicker, Form, Input, Select } from "antd";
import React from "react";

export const ScenarioCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: groupSelectProps } = useSelect({
    resource: "groupUsers",
    optionLabel: "name",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Group"}
          name={["groupId"]}
        >
          <Select {...groupSelectProps} />
        </Form.Item>
        <Form.Item
          label={"User"}
          name={["userId"]}
        >
          <Select {...userSelectProps} />
        </Form.Item>
        <Form.Item
          label={"Start Time"}
          name={["startTime"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker showTime format={DATETIME_FORMAT} />
        </Form.Item>
      </Form>
    </Create>
  );
};
