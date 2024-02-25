import {
  DateField,
  NumberField,
  Show,
  TextField,
} from "@refinedev/antd";
import { IResourceComponentsProps, useOne, useShow } from "@refinedev/core";
import { Typography } from "antd";
import React from "react";

const { Title } = Typography;

export const ScenarioShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: groupData, isLoading: groupIsLoading } = useOne({
    resource: "group",
    id: record?.groupId || "",
    queryOptions: {
      enabled: !!record?.groupId,
    },
  });

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: "user",
    id: record?.userId || "",
    queryOptions: {
      enabled: !!record?.userId,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"ID"}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      {!!record?.groupId &&
        <>
          <Title level={5}>{"Group"}</Title>
          <TextField
            value={
              groupIsLoading ? <>Loading...</> : <>{groupData?.data?.groupName}</>
            }
          />
        </>
      }
      {!!record?.userId &&
        <>
          <Title level={5}>{"User"}</Title>
          <TextField
            value={
              userIsLoading ? <>Loading...</> : <>{userData?.data?.email}</>
            }
          />
        </>
      }
      {/* <Title level={5}>{"Start Time"}</Title>
      <DateField value={record?.startTime} /> */}
      <Title level={5}>{"Status"}</Title>
      <TextField value={record?.status} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.createdAt} />
    </Show>
  );
};
