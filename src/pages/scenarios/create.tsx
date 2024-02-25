import React from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Form, Input, Radio, Select } from "antd";

export const ScenarioCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, form } = useForm({});

  const { selectProps: groupSelectProps } = useSelect({
    resource: "group",
    optionLabel: "name",
  });

  const { selectProps: userSelectProps } = useSelect({
    resource: "user",
    optionLabel: "email",
  });

  const sendType = Form.useWatch('sendType', form);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" initialValues={{ sendType: 'group' }}>
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
    </Create>
  );
};
