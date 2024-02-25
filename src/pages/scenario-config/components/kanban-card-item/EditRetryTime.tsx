import {
  Button,
  Card,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Space,
  theme,
  Typography,
} from "antd";
import { FC } from "react";
const { Paragraph } = Typography;

export const EditRetryTime: FC<any> = ({ stepData, setStepData }) => {
  const handleSubmit = (values: any) => {
    console.log("values", values)
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label={"Số lần retry"}
        name={["numberRetry"]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Paragraph>{"Thời gian mỗi lần retry"}</Paragraph>
      <Space direction="horizontal">
        <Form.Item
          label={"Hour"}
          name={["Hour"]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Minute"}
          name={["Minute"]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label={"Second"}
          name={["Second"]}
        >
          <InputNumber />
        </Form.Item></Space>
    </Form>
  );
};


