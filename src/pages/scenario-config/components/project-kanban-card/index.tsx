import { memo, useMemo, useState } from "react";

import { useDelete, useNavigation } from "@refinedev/core";

import {
  DeleteOutlined,
  EyeOutlined,
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
import favIcon from "@/assets/211694_bell_icon.png"
import transfIcon from "@/assets/compute-trans.png"
import roundtransIcon from "@/assets/circle-arrow-icon.png"
import clockIcon from "@/assets/clock.png"


// const { Text } = Typography;

export const ProjectCard = ({
  id,
  title,
  checkList,
  comments,
  dueDate,
  users,
  channel,
  data
}: any) => {
  const { token } = theme.useToken();
  const { edit } = useNavigation();
  const { mutate } = useDelete();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isMailModalOpen, setIsMailModalOpen] = useState(false);
  const [isResponseTimeModalOpen, setIsResponseTimeModalOpen] = useState(false);
  const [isRetryModalOpen, setIsRetryModalOpen] = useState(false);

  const showMessageModal = () => {
    setIsMessageModalOpen(true);
  };
  const showMailModal = () => {
    setIsMailModalOpen(true);
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

  const dropdownItems = useMemo(() => {
    const dropdownItems: MenuProps["items"] = [
      // {
      //   label: "View card",
      //   key: "1",
      //   icon: <EyeOutlined />,
      //   onClick: () => {
      //     edit("steps", id, "replace");
      //   },
      // },
      {
        danger: true,
        label: "Delete card",
        key: "2",
        icon: <DeleteOutlined />,
        onClick: () => {
          mutate({
            resource: "steps",
            id,
            meta: {
              operation: "task",
            },
          });
        },
      },
    ];

    return dropdownItems;
  }, []);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) return null;

    const date = dayjs(dueDate);

    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date.format("MMM D"),
    };
  }, [dueDate]);

  const checkListCompletionCountOptions = useMemo(() => {
    const hasCheckList = checkList && checkList.length > 0;
    if (!hasCheckList) {
      return null;
    }

    const total = checkList.length;
    const checked = checkList?.filter((item: any) => item.checked).length;

    const defaulOptions = {
      color: "default",
      text: `${checked}/${total}`,
      allCompleted: false,
    };

    if (checked === total) {
      defaulOptions.color = "success";
      defaulOptions.allCompleted = true;
      return defaulOptions;
    }

    return defaulOptions;
  }, [checkList]);

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
        title={<Text ellipsis={{ tooltip: channel }}>{channel}</Text>}
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropdownItems,
              onPointerDown: (e) => {
                e.stopPropagation();
              },
              onClick: (e) => {
                e.domEvent.stopPropagation();
              },
            }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              shape="circle"
              icon={
                <MoreOutlined
                  style={{
                    transform: "rotate(90deg)",
                  }}
                />
              }
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </Dropdown>
        }
      >
        <Space direction="vertical">
          <CollorBellIcon style={{ alignSelf: "center" }} width={40} height={40} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text size="xl" className={styles.text} >Gửi đến:</Text>
            <EditIcon onClick={showMailModal} width={25} height={25} />
          </div>
          <Text size="xl" className={styles.title}>Chương trình lì xì tết đầu năm</Text>
          <Text size="xs" className={styles.content}>he he hh eheh eh eh eh e he he he heho ho oho ho ho hoho fdo dofh odfho dfho dfoh dfoh odf odf odfho dfoh dfoh dfo hdfoh odfho dfho dfoh dofh </Text>
          <Text size="sm" className={styles.editMessage} onClick={showMessageModal}>Edit message</Text>
          <div className={styles.timeContainer}>
            <div className={styles.timeItem}>
              <ComputerTransfer style={{ alignSelf: "center" }} width={25} height={25} />
            </div>
            <div className={styles.timeItem}>
              <ReverseIcon style={{ alignSelf: "center" }} width={25} height={25} onClick={showRetryModal} />
              <div className={styles.smallTimeItem}>
                <TextField value={data?.delayRetryHour} />h
              </div>
              <div className={styles.smallTimeItem}>
                <TextField value={data?.delayRetryMin} />m
              </div>
              <div className={styles.smallTimeItem}>
                <TextField value={data?.delayRetrySecond} />s
              </div>
            </div>

            <div className={styles.timeItem}>
              <ClockIcon style={{ alignSelf: "center" }} width={25} height={25} onClick={showResponseTimeModal} />
              <div className={styles.smallTimeItem}>
                <TextField value={data?.responseTimeHour} />h
              </div>
              <div className={styles.smallTimeItem}>
                <TextField value={data?.responseTimeMin} />m
              </div>
              <div className={styles.smallTimeItem}>
                <TextField value={data?.responseTimeSecond} />s
              </div>
            </div>
          </div>
        </Space>
      </Card>
      <Modal open={isMessageModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditMessageCard />
      </Modal>
      <Modal open={isMailModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditEmailCard />
      </Modal>
      <Modal open={isResponseTimeModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditResponseTime />
      </Modal>
      <Modal open={isRetryModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <EditRetryTime />
      </Modal>

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
