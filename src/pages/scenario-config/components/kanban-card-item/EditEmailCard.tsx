import {
  Form,
  Select,
  Space,
  Typography,
} from "antd";
import { FC } from "react";

const { Title } = Typography;

export const EditEmailCard: FC<any> = ({ stepData, setStepData }) => {
  return (
    <Form layout="vertical">
      <Form.Item
        label={"Channel"}
        name={["channel"]}
      >
        <Select style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label={"Group customer"}
        name={["customerGroup"]}
      >
        <Select style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label={"Hoặc KH cá nhân"}
        name={["users"]}
      >
        <Select style={{ width: "100%" }} />
      </Form.Item>
    </Form>

  );
};


