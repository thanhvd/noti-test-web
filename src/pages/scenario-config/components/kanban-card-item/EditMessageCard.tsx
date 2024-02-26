import {
    Button,
    Card,
    ConfigProvider,
    Form,
    Input,
    Modal,
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

export const EditMessageCard: FC<any> = ({ open, onOk, onCancel, stepData, setStepData }) => {
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
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    templateContent: stepData.templateContent,
                    templateTitle: stepData.templateTitle

                }}>
                <Form.Item
                    label={"Content message"}
                    name={["templateContent"]}
                >
                    <TextArea placeholder="Add text" />
                </Form.Item>

                <div className={styles.selectField}>
                    <div style={{ fontSize: "14px", color: "blue", textDecoration: "underline", fontWeight: "500", marginTop: "5px" }}>Sử dụng template</div>
                    <Form.Item
                        style={{ width: "75%" }}
                        name={["templateTitle"]}
                    >
                        <Select />
                    </Form.Item>
                </div>
            </Form>
        </Modal>

    );
};


