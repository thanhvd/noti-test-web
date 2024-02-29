import { NOTIAPI_URL } from "@/utilities";
import { ShowButton } from "@refinedev/antd";
import { BaseRecord, useCustom, useParsed } from "@refinedev/core";
import { List, Space, Table } from "antd";
import { FC, PropsWithChildren } from "react";
import styles from "./index.module.css";
import Paragraph from "antd/es/typography/Paragraph";

export const StepMessagesList: FC<PropsWithChildren> = () => {
  const { id } = useParsed();
  const { data } = useCustom({
    url: `${NOTIAPI_URL}/scenario/step/${id}/history`,
    method: "get",
  });

  console.log("DATA: ", data?.data.data.data);

  const getStatusClassName = (status: string) => {
    switch (status) {
      case "PROCESSING":
        return styles.blue;
      case "PENDING":
        return styles.blue;
      case "SENT":
        return styles.green;
      case "DONE":
        return styles.green;
      case "NOT_SENT":
        return styles.red;
      case "RETRY":
        return styles.red;
      case "NOT_RESPONSE":
        return styles.red;
      case "SEND_FAILED":
        return styles.red;
      case "READ":
        return styles.yellow;
      case "RECEIVED":
        return styles.yellow;
      default:
        return "";
    }
  };

  return (
    <List>
      <Table dataSource={data?.data.data.data} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} />
        <Table.Column dataIndex="channel" title={"Channel"} />
        <Table.Column dataIndex="userEmail" title={"User Email"} />
        <Table.Column dataIndex="titleMessage" title={"Title Message"} />
        <Table.Column
          dataIndex="contentMessage"
          title={"Content Message"}
          render={(html) => (
            <Paragraph
              ellipsis={{
                rows: 4,
                expandable: true,
                symbol: "Xem thêm",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </Paragraph>
          )}
        />
        <Table.Column
          dataIndex="status"
          title={"Status"}
          render={(value) => (
            <div className={getStatusClassName(value)}>{value}</div>
          )}
        />
        <Table.Column dataIndex="allowNoti" title={"Allow Noti"} />
        <Table.Column dataIndex="reasonFail" title={"Reason Fail"} />
        <Table.Column dataIndex="numberRetry" title={"Number Retry"} />

      </Table>
    </List>
  );
};
