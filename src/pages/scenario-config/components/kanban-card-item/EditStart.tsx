import {
  Button,
  Card,
  ConfigProvider,
  DatePicker,
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
  return (
    <Space style={{ position: "relative", width: "100%" }} direction="vertical">
      <div style={{ display: "flex", columnGap: "20px" }}>
        <Title style={{ fontSize: "20px", marginTop: "-5px" }} level={5}>{"Start now"}</Title>
        <Switch />
      </div>
      <Input placeholder="Add text" />
      <Title level={4}>{"Hoặc đặt lịch"}</Title>
      <div style={{ display: "flex", justifyItems: "center", columnGap: "20px" }}>
        <DatePicker showTime format={DATETIME_FORMAT} />
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


