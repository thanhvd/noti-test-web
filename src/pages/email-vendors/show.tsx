import {
  DateField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export const EmailVendorsShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
      <Title level={5}>{"Deleted At"}</Title>
      <TextField value={record?.deletedAt} />
      <Title level={5}>{"Updated At"}</Title>
      <TextField value={record?.updatedAt} />
      <Title level={5}>{"Hostname"}</Title>
      <TextField value={record?.hostName} />
      <Title level={5}>{"Port"}</Title>
      <TextField value={record?.port} />
      <Title level={5}>{"Username"}</Title>
      <TextField value={record?.userName} />
      <Title level={5}>{"Password"}</Title>
      <TextField value={record?.password} />
      <Title level={5}>{"Priority"}</Title>
      <TextField value={record?.priority} />
    </Show>
  );
};
