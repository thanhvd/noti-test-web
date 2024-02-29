import { memo, useMemo, useState } from "react";

import {
  useDelete,
  useLink,
  useNavigation,
  useParsed,
  useUpdate,
} from "@refinedev/core";

import {
  BellOutlined,
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
  MessageOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  Card,
  ConfigProvider,
  Dropdown,
  Modal,
  Skeleton,
  Space,
  theme,
} from "antd";
import dayjs from "dayjs";

import { Text } from "@/components";
import { User } from "@/graphql/schema.types";
import { getDateColor } from "@/utilities";
import { TextField } from "@refinedev/antd";
import styles from "./index.module.css";
import { EditMessageCard } from "../kanban-card-item/EditMessageCard";
import { EditEmailCard } from "../kanban-card-item/EditEmailCard";
import { EditResponseTime } from "../kanban-card-item/EditResponseTime";
import { EditRetryTime } from "../kanban-card-item/EditRetryTime";
import { EditStart } from "../kanban-card-item/EditStart";
import EditIcon from "@/components/icon/EditIcon";
import ReverseIcon from "@/components/icon/ReverseIcon";
import ClockIcon from "@/components/icon/ClockIcon";
import CollorBellIcon from "@/components/icon/ColorBellIcon";
import ComputerTransfer from "@/components/icon/ComputerTransferIcon";
import favIcon from "@/assets/211694_bell_icon.png";
import transfIcon from "@/assets/compute-trans.png";
import roundtransIcon from "@/assets/circle-arrow-icon.png";
import clockIcon from "@/assets/clock.png";

// const { Text } = Typography;

export const ProjectCard = ({ id, checkList, dueDate, channel, data }: any) => {
  const { token } = theme.useToken();
  const { edit } = useNavigation();
  const { mutate } = useDelete();
  const { mutate: mutateUpdateStep } = useUpdate();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [isResponseTimeModalOpen, setIsResponseTimeModalOpen] = useState(false);
  const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);
  const [stepData, setStepData] = useState(data);
  const [dirty, setDirty] = useState(false);

  const showMessageModal = () => {
    setIsMessageModalOpen(true);
  };
  const showResponseTimeModal = () => {
    setIsResponseTimeModalOpen(true);
  };
  const showRetryModal = () => {
    setIsRetryModalOpen(true);
  };

  const handleOk = () => {
    setIsMessageModalOpen(false);
    setIsMailModalOpen(false);
    setIsResponseTimeModalOpen(false);
    setIsRetryModalOpen(false);
  };

  const handleCancel = () => {
    setIsMessageModalOpen(false);
    setIsMailModalOpen(false);
    setIsResponseTimeModalOpen(false);
    setIsRetryModalOpen(false);
  };

  const updateStepData = (values: any) => {
    setStepData((step: any) => ({
      ...step,
      ...values,
    }));
    setDirty(true);
  };

  const Link = useLink();

  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Card
        className={styles.container}
        size="default"
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            {stepData?.channel === "PUSH" && (
              <BellOutlined style={{ fontSize: 24 }} />
            )}
            {stepData?.channel === "EMAIL" && (
              <MailOutlined style={{ fontSize: 24 }} />
            )}
            {stepData?.channel === "SMS" && (
              <MessageOutlined style={{ fontSize: 24 }} />
            )}
            <Text ellipsis={{ tooltip: channel }}>{channel}</Text>
          </div>
        }
        extra={
          dirty && (
            <Button
              type="primary"
              title="Save"
              // onPointerDown={(e) => {
              //   e.stopPropagation();
              // }}
              onClick={(e) => {
                e.stopPropagation();
                const { id, ...formValues } = stepData;
                mutateUpdateStep(
                  {
                    resource: `scenario/step`,
                    values: formValues,
                    id,
                    meta: {
                      method: "put",
                    },
                  },
                  {
                    onSuccess: () => {
                      setDirty(false);
                    },
                  }
                );
              }}
            >
              Save
            </Button>
          )
          // <Dropdown
          //   trigger={["click"]}
          //   menu={{
          //     items: dropdownItems,
          //     onPointerDown: (e) => {
          //       e.stopPropagation();
          //     },
          //     onClick: (e) => {
          //       e.domEvent.stopPropagation();
          //     },
          //   }}
          //   placement="bottom"
          //   arrow={{ pointAtCenter: true }}
          // >
          //   <Button
          //     type="text"
          //     shape="circle"
          //     icon={
          //       <MoreOutlined
          //         style={{
          //           transform: "rotate(90deg)",
          //         }}
          //       />
          //     }
          //     onPointerDown={(e) => {
          //       e.stopPropagation();
          //     }}
          //     onClick={(e) => {
          //       e.stopPropagation();
          //     }}
          //   />
          // </Dropdown>
        }
      >
        <Space direction="vertical">
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text size="xl" className={styles.text} >Gửi đến:</Text>
            <EditIcon onClick={showMailModal} width={25} height={25} />
          </div> */}
          <Text size="xl" className={styles.title}>
            {stepData.templateTitle}
          </Text>
          <Text size="xs" className={styles.content}>
            {stepData.templateContent}
          </Text>
          <Text
            size="sm"
            className={styles.editMessage}
            onClick={showMessageModal}
          >
            Edit message
          </Text>
          <Link Link to={`/step-messages/${id}`}>
            <Button>View message</Button>
          </Link>
          <div className={styles.timeContainer}>
            <div className={styles.timeItem}>
              <ComputerTransfer
                style={{ alignSelf: "center" }}
                width={25}
                height={25}
              />
              <div>{stepData?.sentSuccess}</div>
            </div>
            <div className={styles.timeItem}>
              <div>{stepData?.numberRetry}</div>
              <ReverseIcon
                style={{ alignSelf: "center" }}
                width={25}
                height={25}
                onClick={showRetryModal}
              />
              <div className={styles.smallTimeItem}>
                <TextField value={stepData?.delayRetryHour} />h{" "}
                <TextField value={stepData?.delayRetryMin} />m{" "}
                <TextField value={stepData?.delayRetrySecond} />s{" "}
              </div>
            </div>

            <div className={styles.timeItem}>
              <ClockIcon
                style={{ alignSelf: "center" }}
                width={25}
                height={25}
                onClick={showResponseTimeModal}
              />
              <div className={styles.smallTimeItem}>
                <TextField value={stepData?.responseTimeHour} />h{" "}
                <TextField value={stepData?.responseTimeMin} />m{" "}
                <TextField value={stepData?.responseTimeSecond} />s{" "}
              </div>
            </div>
          </div>
          {/* <div style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <Button
              type="primary"
              title="Save"
              // onPointerDown={(e) => {
              //   e.stopPropagation();
              // }}
              onClick={(e) => {
                e.stopPropagation();
                const { id, ...formValues } = stepData
                mutateUpdateStep({
                  resource: `scenario/step`,
                  values: formValues,
                  id,
                  meta: {
                    method: 'put'
                  }
                })
              }}
            >
              Save
            </Button>
          </div> */}
        </Space>
      </Card>
      <EditMessageCard
        open={isMessageModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        stepData={stepData}
        updateStepData={updateStepData}
      />
      {/* <EditEmailCard open={isMailModalOpen} onOk={handleOk} onCancel={handleCancel} stepData={stepData} updateStepData={updateStepData} /> */}
      <EditResponseTime
        open={isResponseTimeModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        stepData={stepData}
        updateStepData={updateStepData}
      />
      <EditRetryTime
        open={isRetryModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        stepData={stepData}
        updateStepData={updateStepData}
      />
    </ConfigProvider>
  );
};

export const ProjectCardSkeleton = () => {
  return (
    <Card
      size="small"
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
      }}
      title={
        <Skeleton.Button
          active
          size="small"
          style={{
            width: "200px",
            height: "22px",
          }}
        />
      }
    >
      <Skeleton.Button
        active
        size="small"
        style={{
          width: "200px",
        }}
      />
      <Skeleton.Avatar active size="small" />
    </Card>
  );
};

export const ProjectCardMemo = memo(ProjectCard, (prev, next) => {
  return (
    prev.id === next.id &&
    prev.title === next.title &&
    prev.dueDate === next.dueDate &&
    prev.comments?.totalCount === next.comments?.totalCount &&
    prev.checkList?.length === next.checkList?.length &&
    prev.users?.length === next.users?.length
  );
});
