import { DATETIME_FORMAT } from "@/utilities";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import React from "react";

export const ScenarioEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, formLoading } = useForm({});

  const ScenariosData = queryResult?.data?.data;

  const { selectProps: groupSelectProps } = useSelect({
    resource: "groupUsers",
    optionLabel: "name",
    defaultValue: ScenariosData?.groupId,
    queryOptions: {
      enabled: !!ScenariosData?.groupId,
    },
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "users",
    optionLabel: "email",
    defaultValue: ScenariosData?.userId,
    queryOptions: {
      enabled: !!ScenariosData?.userId,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} isLoading={formLoading}>
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
          getValueProps={(value) => ({
            value: value ? dayjs(value) : "",
          })}
        >
          <DatePicker showTime format={DATETIME_FORMAT} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
