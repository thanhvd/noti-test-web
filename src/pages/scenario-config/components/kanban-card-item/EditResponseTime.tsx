import {
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Typography,
} from "antd";
import { FC } from "react";

const { Title } = Typography;

export const EditResponseTime: FC<any> = ({ open, onOk, onCancel, stepData, setStepData }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            setStepData((step: any) => ({ ...step, ...values }));
            onOk()
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    > <Form form={form}
      layout="vertical"
      initialValues={{
        responseTimeHour: stepData.responseTimeHour,
        responseTimeMin: stepData.responseTimeMin,
        responseTimeSecond: stepData.responseTimeSecond,
      }} >
        {/* <Title level={5}>{"Repsonse time"}</Title> */}
        <Space direction="horizontal">
          <Form.Item
            label={"Hour"}
            name={["responseTimeHour"]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label={"Minute"}
            name={["responseTimeMin"]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label={"Second"}
            name={["responseTimeSecond"]}
          >
            <InputNumber />
          </Form.Item>
        </Space>
      </Form>
    </Modal>

  );
};


