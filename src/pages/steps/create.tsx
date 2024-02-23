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
      rules={[
            {
              required: true,
            },
          ]}
      </Form>
    </Create>
  );
};
