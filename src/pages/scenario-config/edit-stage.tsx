import { useModalForm } from "@refinedev/antd";
import { useInvalidate, useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";


export const KanbanEditStage = () => {
    const invalidate = useInvalidate();
    const { list } = useNavigation();
    const { formProps, modalProps, close } = useModalForm<
        any>({
            action: "edit",
            defaultVisible: true,
            resource: "stepStages",
            meta: {
            },
            onMutationSuccess: () => {
                invalidate({ invalidates: ["list"], resource: "steps" });
            },
            successNotification: () => {
                return {
                    key: "edit-stage",
                    type: "success",
                    message: "Successfully updated stage",
                    description: "Successful",
                };
            },
        });

    return (
        <Modal
            {...modalProps}
            onCancel={() => {
                close();
                list("steps", "replace");
            }}
            title="Edit stage"
            width={512}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};
