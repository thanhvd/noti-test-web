import { NOTIAPI_URL } from "@/utilities";
import {
  DateField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { IResourceComponentsProps, useCustom, useParsed, useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export const TemplateShow: React.FC<IResourceComponentsProps> = () => {
  const { id } = useParsed();
  const { data, isLoading } = useCustom({
    url: `${NOTIAPI_URL}/template/${id}/detail`,
    method: 'get'
  });

  const record = data?.data?.data;

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
      <Title level={5}>{"Channel"}</Title>
      <TextField value={record?.channel} />
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Content"}</Title>
      <TextField value={record?.content} />

    </Show>
  );
};
