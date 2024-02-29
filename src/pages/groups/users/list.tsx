/* eslint-disable @typescript-eslint/no-explicit-any */
import { NOTIAPI_URL } from "@/utilities";
import {
  UnorderedListOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useForm,
  useSelect,
  useTable,
} from "@refinedev/antd";
import {
  BaseRecord,
  IResourceComponentsProps,
  useCustomMutation,
  useList,
  useMany,
  useOne,
  useParsed,
} from "@refinedev/core";
import { Button, Form, Select, Space, Table, notification } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const GroupUserList: React.FC<IResourceComponentsProps> = () => {
  const { id: groupId } = useParsed();
  const { tableProps, tableQueryResult } = useTable({
    resource: `group/${groupId}/user`,
  });

  const { data: groupData, isLoading: groupIsLoading } = useOne({
    resource: "group",
    id: groupId,
    queryOptions: {
      enabled: !!groupId,
    },
  });

  const group = groupData?.data;

  // const { data: userData, isLoading: userIsLoading } = useMany({
  //   resource: "user",
  //   ids:
  //     tableProps?.dataSource?.map((item) => item?.userId).filter(Boolean) ?? [],
  //   queryOptions: {
  //     enabled: !!tableProps?.dataSource?.length,
  //   },
  // });

  // const { data: users } = useList({
  //   resource: "user",
  // });
  // console.log("users", users);

  const { formProps } = useForm({});

  const { selectProps: userSelectProps } = useSelect({
    resource: "user",
    optionLabel: "email",
  });

  const {mutate} = useCustomMutation()

  return (
    <List
      headerProps={{
        title: `Group ${group?.groupName || group?.id} - Users`,
      }}
      headerButtons={[
        <Link to={`/groups`}>
          <Button size="middle" icon={<UnorderedListOutlined />}>
            Groups
          </Button>
        </Link>,
        <Form
          {...formProps}
          layout="horizontal"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onFinish={async (values: any) => {
            mutate({
              method: 'post',
              url: `${NOTIAPI_URL}/group/user/add`,
              values: {
                groupId,
                userId: values?.user?.id
              },
            },
            {
              onError: (error, variables, context) => {
                console.log('ERROR');
              },
              onSuccess: (data, variables, context) => {
                notification['success']({
                  message: 'Successful',
                  description: 'Successfully added user to group',
                });
                tableQueryResult.refetch();
              },
            })
          }}
        >
          <Form.Item name={["user", "id"]} style={{ margin: 0 }}>
            <Select {...userSelectProps} style={{ minWidth: 300 }} />
          </Form.Item>

          <Form.Item style={{ margin: 0 }}>
            <Button size="middle" icon={<UserAddOutlined />} type="primary" htmlType="submit">
              Add user
            </Button>
          </Form.Item>
        </Form>,
      ]}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="phoneNumber" title={"Phone Number"} />
        <Table.Column dataIndex="status" title={"Status"} />
        <Table.Column dataIndex="username" title={"Username"} />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <Button size="small" icon={<UserDeleteOutlined />} danger onClick={() => {
                mutate({
                  method: 'post',
                  url: `${NOTIAPI_URL}/group/user/remove`,
                  values: {
                    groupId,
                    userId: record.id
                  },
                },
                {
                  onError: (error, variables, context) => {
                    console.log('ERROR');
                  },
                  onSuccess: (data, variables, context) => {
                    notification['success']({
                      message: 'Successful',
                      description: 'Successfully remove user from group',
                    });
                    tableQueryResult.refetch();
                  },
                })
              }}>
                Remove
              </Button>
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
