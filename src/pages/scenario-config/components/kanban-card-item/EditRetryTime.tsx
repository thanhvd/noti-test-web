import {
  Button,
  Card,
  ConfigProvider,
  Input,
  Select,
  Skeleton,
  Space,
  theme,
  Typography,
} from "antd";
import { FC } from "react";
const { Title } = Typography;

export const EditRetryTime: FC = () => {
  return (
    <Space style={{ position: "relative", width: "100%" }} direction="vertical">
      <Title level={5}>{"Số lần retry"}</Title>
      <Input placeholder="Add text" />
      <Title style={{ marginTop: "10px" }} level={5}>{"Thời gian mỗi lần retry"}</Title>
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


