import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";

import styles from "./index.module.css";
import { FC } from "react";
import { DATETIME_FORMAT } from "@/utilities";

const { Title } = Typography;

export const EditStart: FC<any> = ({ open, onOk, onCancel, scenarioData, setScenarioData }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setScenarioData((step: any) => ({ ...step, ...values }));
            onOk()
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    ><Form form={form}
      layout="vertical"
      initialValues={{
        // numberRetry: scenarioData.numberRetry,
        // delayRetryHour: scenarioData.delayRetryHour,
        // delayRetryMin: scenarioData.delayRetryMin,
        // delayRetrySecond: scenarioData.delayRetrySecond,

      }} >
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
    </Modal>

  );
};


