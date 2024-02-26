import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";

import styles from "./index.module.css";
import { FC } from "react";
import { DATE_FORMAT, DATETIME_FORMAT } from "@/utilities";
import { useUpdate } from "@refinedev/core";

const { Title, Paragraph } = Typography;

export const EditStart: FC<any> = ({ open, onOk, onCancel, scenarioData, setScenarioData, selectedScenario }) => {
  const [form] = Form.useForm();
  const { mutate: mutateUpdateScenario } = useUpdate();


  const isStartNow = Form.useWatch('isStartNow', form);

  // {
  //   "startDate": "2024-02-26",
  //   "hour": 0,
  //   "minute": 0,
  //   "second": 0,
  //   "isStartNow": true
  // }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // console.log("values", values)
            // setScenarioData((step: any) => ({ ...step, ...values }));
            // const { id, ...formValues } = stepData
            mutateUpdateScenario({
              resource: `scenario/time`,
              values: values,
              id: selectedScenario?.id,
              meta: {
                method: 'post'
              }
            })
            onOk()
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{

          // "startDate": "2024-02-26",
          // "hour": 0,
          // "minute": 0,
          // "second": 0,
          // "isStartNow": true

          // numberRetry: scenarioData.numberRetry,
          // delayRetryHour: scenarioData.delayRetryHour,
          // delayRetryMin: scenarioData.delayRetryMin,
          // delayRetrySecond: scenarioData.delayRetrySecond,

        }} >
        <div style={{ display: "flex", columnGap: "20px" }}>
          <Title style={{ fontSize: "20px" }} level={5}>{"Start now"}</Title>
          <Form.Item name={"isStartNow"} >
            <Switch />
          </Form.Item>
        </div>
        {!isStartNow &&
          <>
            <Paragraph>Hoặc đặt lịch</Paragraph>
            {/* <Form.Item
          name={""}
        >
          <Input placeholder="Add text" />
        </Form.Item> */}
            <Space direction="horizontal">
              <Form.Item
                label={"Ngày"}
                name={["startDate"]}
                style={{ fontWeight: "500", fontSize: "20px" }}
              >
                <DatePicker format={DATE_FORMAT} />
              </Form.Item>
              <Form.Item
                label={"Hour"}
                name={["hour"]}
              >
                <InputNumber placeholder="Add hour" />
              </Form.Item>
              <Form.Item
                label={"Minute"}
                name={["minute"]}
              >
                <InputNumber placeholder="Add minute" />
              </Form.Item>
              <Form.Item
                label={"Second"}
                name={["second"]}
              >
                <InputNumber placeholder="Add second" />
              </Form.Item>
            </Space>
          </>
        }
      </Form>
    </Modal>

  );
};


