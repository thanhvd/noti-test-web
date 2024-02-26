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
import { useSelect } from "@refinedev/antd";

const { Title } = Typography;

export const EditMessageCard: FC<any> = ({ open, onOk, onCancel, stepData, setStepData }) => {
    const [form] = Form.useForm();

    const { selectProps: templateSelectProps, queryResult } = useSelect({
        resource: "template",
        optionLabel: "title",
    });

    console.log("queryResult", queryResult)

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        const selectedTemplate: any = queryResult.data?.data.find((o: any) => o.id === values.templateId)
                        console.log("selectedTemplate", selectedTemplate)
                        setStepData((step: any) => ({
                            ...step,
                            ...values,
                            ...{
                                templateTitle: selectedTemplate?.title,
                                templateContent: selectedTemplate?.content,
                            }
                        }));
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
                    label={"Template"}
                    name={["templateId"]}
                >
                    <Select {...templateSelectProps} />
                </Form.Item>

                {/* <Form.Item
                    label={"Content title"}
                    name={["templateTitle"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Content message"}
                    name={["templateContent"]}
                >
                    <TextArea placeholder="Add text" />
                </Form.Item> */}

                {/* <div className={styles.selectField}>
                    <div style={{ fontSize: "14px", color: "blue", textDecoration: "underline", fontWeight: "500", marginTop: "5px" }}>Sử dụng template</div>
                    <Form.Item
                        style={{ width: "75%" }}
                        name={["templateTitle"]}
                    >
                        <Select />
                    </Form.Item>
                </div> */}
            </Form>
        </Modal>

    );
};


