import React from "react";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Radio, Select } from "antd";

export const ScenarioEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, formLoading, form } = useForm({});

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

  const sendType = Form.useWatch('sendType', form);

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
          name={["sendType"]}>
          <Radio.Group>
            <Radio value="user"> Gửi cá nhân </Radio>
            <Radio value="group"> Gửi nhóm </Radio>
          </Radio.Group>
        </Form.Item>
        {sendType === 'group' &&
          <Form.Item
            label={"Group"}
            name={["groupId"]}
          >
            <Select {...groupSelectProps} />
          </Form.Item>
        }
        {sendType === 'user' &&
          <Form.Item
            label={"User"}
            name={["userId"]}
          >
            <Select {...userSelectProps} />
          </Form.Item>
        }
        {/* <Form.Item
          label={"Start Time"}
          name={["startTime"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker showTime format={DATETIME_FORMAT} />
        </Form.Item> */}
      </Form>
    </Edit>
  );
};
