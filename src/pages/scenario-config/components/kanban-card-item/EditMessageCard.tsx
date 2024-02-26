import {
    Button,
    Card,
    ConfigProvider,
    Form,
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

const { Title } = Typography;

export const EditMessageCard: FC<any> = ({ stepData, setStepData }) => {
    const handleSubmit = (values: any) => {
        console.log("values", values)
    }
    return (
        <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label={"Content message"}
                name={["content"]}
            >
                <TextArea placeholder="Add text" />
            </Form.Item>

            <div className={styles.selectField}>
                <div style={{ fontSize: "14px", color: "blue", textDecoration: "underline", fontWeight: "500", marginTop: "5px" }}>Sử dụng template</div>
                <Form.Item
                    style={{ width: "75%" }}
                    name={["templates"]}
                >
                    <Select />
                </Form.Item>
            </div>
        </Form>
    );
};


