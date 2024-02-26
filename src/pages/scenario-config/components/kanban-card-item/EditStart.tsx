import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";

import styles from "./index.module.css";
import { FC } from "react";
import { DATETIME_FORMAT } from "@/utilities";

const { Title } = Typography;

export const EditStart: FC = () => {
  const handleSubmit = (values: any) => {
    console.log("values", values)
  }
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <div style={{ display: "flex", columnGap: "20px" }}>
        <Title style={{ fontSize: "20px" }} level={5}>{"Start now"}</Title>
        <Form.Item>
          <Switch />
        </Form.Item>
      </div>
      <Form.Item
        name={""}
      >
        <Input placeholder="Add text" />
      </Form.Item>
      <Space direction="horizontal">
        <Form.Item
          label={"Hoặc đặt lịch"}
          style={{ fontWeight: "500", fontSize: "20px" }}
        >
          <DatePicker format={DATETIME_FORMAT} />
        </Form.Item>
        <Form.Item
          label={"Hour"}
          name={["hour"]}
        >
          <Input placeholder="Add text" />
        </Form.Item>
        <Form.Item
          label={"Minute"}
          name={["minute"]}
        >
          <Input placeholder="Add text" />
        </Form.Item>
        <Form.Item
          label={"Second"}
          name={["second"]}
        >
          <Input placeholder="Add text" />
        </Form.Item>
      </Space>
    </Form>
  );
};


