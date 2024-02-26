import {
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import { FC } from "react";

const { Title } = Typography;

export const EditResponseTime: FC<any> = ({ stepData, setStepData }) => {
  const handleSubmit = (values: any) => {
    console.log("values", values)
  }
  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      {/* <Title level={5}>{"Repsonse time"}</Title> */}
      <Form.Item
        label={"Response time"}
        name={["responseTime"]}
      >
        <Space direction="horizontal">
          <div>
            <Title level={5}>{"Hour"} </Title>
            <Input placeholder="Add text" />
          </div>

          <div>
            <Title level={5}>{"Minute"} </Title>
            <Input placeholder="Add text" />
          </div>

          <div>
            <Title level={5}>{"Second"} </Title>
            <Input placeholder="Add text" />
          </div>
        </Space>
      </Form.Item>
    </Form>
  );
};


