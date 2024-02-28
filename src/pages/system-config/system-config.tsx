/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  List,
} from "@refinedev/antd";
import { IResourceComponentsProps } from "@refinedev/core";
import { Button, Space, Switch, Typography } from "antd";
import React from "react";

const { Title } = Typography

export const SystemConfig: React.FC<IResourceComponentsProps> = () => {

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }
  return (
    <List>
      <Space direction="vertical">
        <Title >System Configuration</Title>
        <Space direction="vertical" >
          <Space direction="horizontal">
            <Title level={2}>Execute scenario auto</Title>
            <Switch onChange={onChange} style={{ marginBottom: "7px", marginLeft: "20px" }} />
          </Space>
          <Title level={2}>Execute scenario manually</Title>
          <Button style={{ border: "solid 2px", borderRadius: "20px", padding: "8px 10px 30px 15px", color: "gray" }}>Execute Scenario</Button>
          <Button style={{ border: "solid 2px", borderRadius: "20px", padding: "8px 20px 30px 22px", color: "gray" }}>Update Status</Button>
        </Space>
      </Space>
    </List>
  );
};
