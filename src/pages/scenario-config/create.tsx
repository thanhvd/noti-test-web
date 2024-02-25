import { useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import { useCustom, useNavigation, useParsed } from "@refinedev/core";

import { Form, Input, Modal, Select } from "antd";
import { NOTIAPI_URL } from "@/utilities";


export const KanbanCreatePage = () => {
  const [searchParams] = useSearchParams();
  const { list } = useNavigation();
  const { id } = useParsed();
  const { formProps, modalProps, close } = useModalForm<any>({
    resource: "scenario/step",
    action: "create",
    defaultVisible: true,
    meta: {},
    // onMutationSuccess: () => {
    //   close();
    //   list("steps", "replace");
    // }
  });
  const scenarioData = useCustom({
    url: `${NOTIAPI_URL}/scenario/${id}/detail`,
    method: 'get'
  })
  const scenario = scenarioData.data?.data?.data
  console.log("scenario", scenario)
  console.log("id", id)
  console.log('searchParams.get("stageId")', searchParams.get("stageId"))
  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        close();
        list("steps", "replace");
      }}
      title="Add new step"
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps?.onFinish?.({
            ...values,
            scenarioId: scenario?.id,
            groupCode: searchParams.get("stageId"),
            groupName: searchParams.get("stageId")
          });
          close();
          list("steps", "replace");
        }}
      >
        <Form.Item
          label={"Channel"}
          name={["channel"]}
          initialValue={"PUSH"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            defaultValue={"PUSH"}
            options={[
              { value: "PUSH", label: "Push notification" },
              { value: "EMAIL", label: "Send email" },
              { value: "SMS", label: "Send sms" },
            ]}
          // style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
