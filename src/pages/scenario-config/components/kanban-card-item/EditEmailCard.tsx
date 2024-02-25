import {
  Select,
  Space,
  Typography,
} from "antd";
import { FC } from "react";

const { Title } = Typography;

export const EditEmailCard: FC<any> = ({ stepData, setStepData }) => {
  return (
    <Space style={{ position: "relative", width: "100%" }} direction="vertical">
      <Title level={5}>{"Channel"}</Title>
      <Select style={{ width: "100%" }} />
      <Title level={5}>{"Group customer"} </Title>
      <Select style={{ width: "100%" }} />
      <Title level={5}>{"Hoặc KH cá nhân"} </Title>
      <Select style={{ width: "100%" }} />
    </Space>

  );
};


