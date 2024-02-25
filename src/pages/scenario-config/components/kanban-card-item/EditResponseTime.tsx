import {
  Input,
  Space,
  Typography,
} from "antd";
import { FC } from "react";

const { Title } = Typography;

export const EditResponseTime: FC<any> = ({ stepData, setStepData }) => {
  return (
    <Space style={{ position: "relative", width: "100%" }} direction="vertical">
      <Title level={5}>{"Resonse time"}</Title>
      <div style={{ display: "flex", justifyItems: "center", columnGap: "20px" }}>
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
      </div>
    </Space>
  );
};


