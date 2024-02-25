import { useSearchParams } from "react-router-dom";

import { useModalForm } from "@refinedev/antd";
import { useCustom, useInvalidate, useNavigation, useParsed } from "@refinedev/core";
import { useQueryClient } from "@tanstack/react-query";

import { Form, Input, Modal, Select } from "antd";
import { NOTIAPI_URL } from "@/utilities";


export const KanbanCreatePage = () => {
  const [searchParams] = useSearchParams();
  const { list } = useNavigation();
  const { id } = useParsed();
  const invalidate = useInvalidate()
  const queryClient = useQueryClient();

  const { formProps, modalProps, close } = useModalForm<any>({
    resource: "scenario/step",
    action: "create",
    defaultVisible: true,
    meta: {},
    // onMutationSuccess: () => {
    //     invalidate({ invalidates: ["all"], resource: `scenario/${id}/step` });
    //     queryClient.invalidateQueries(["get-list-steps"]);


    // },
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
          // invalidate({ invalidates: ["all"], resource: `steps` });
          // queryClient.invalidateQueries(["get-list-steps"]);
          invalidate({
            dataProviderName: "default",
            invalidates: ["all"],
          });
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
