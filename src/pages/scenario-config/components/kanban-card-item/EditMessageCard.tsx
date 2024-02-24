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

import styles from "./index.module.css";
import TextArea from "antd/lib/input/TextArea";
import { FC } from "react";
import { CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;

export const EditMessageCard: FC = () => {
    return (
        <Space direction="vertical" style={{ display: "flex", justifyContent: "center" }}>
            <Title level={5}>{"Title message"}</Title>
            <Input className={styles.input} placeholder="Add text" />
            <Title level={5}>{"Content message"} </Title>
            <TextArea placeholder="Add text" />
            <div className={styles.selectField}>
                <div style={{ fontSize: "14px", color: "blue", textDecoration: "underline", fontWeight: "500", marginTop: "5px" }}>Sử dụng template</div>
                <Select style={{ width: "75%" }} />
            </div>
        </Space>
    );
};


