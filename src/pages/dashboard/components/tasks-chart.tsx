import React, { lazy, Suspense, useMemo } from "react";

import { useCustom, useNavigation } from "@refinedev/core";

import { ProjectOutlined, RightCircleOutlined } from "@ant-design/icons";
import { PieConfig } from "@ant-design/plots";
import { Button, Card } from "antd";

import { Text } from "@/components";
import { NOTIAPI_URL } from "@/utilities";

const Pie = lazy(() => import("@ant-design/plots/es/components/pie"));
interface OriginalObject {
    percent: { success: number, fail: number };
    title: string;
}

interface ConvertedObject {
    type: string;
    value: number;
}

export const DashboardTasksChart: React.FC = () => {
    const { list } = useNavigation();

    // const { data, isError, error } = useList<
    //     GetFieldsFromList<DashboardTasksChartQuery>
    // >({
    //     resource: "taskStages",
    //     pagination: {
    //         pageSize: 4,
    //     },
    //     meta: { gqlQuery: DASHBOARD_TASKS_CHART_QUERY },
    // });

    const { data } = useCustom({
        url: `${NOTIAPI_URL}/dashboard/summary`,
        method: 'get'
    });

    const record = data?.data.data
    console.log("RECORD: ", record)

    const outputData = record ? Object.keys(record).map(key => ({
        title: key,
        percent: record[key]
    })) : []
    console.log("OUPUTDATA: ", outputData)

    function convertArray(array: OriginalObject[]): ConvertedObject[] {
        let resultArray: ConvertedObject[] = [];
        array.forEach(obj => {
            let successValue: number = obj.percent.success;
            let failValue: number = obj.percent.fail;
            resultArray.push({ type: "Success", value: successValue });
            resultArray.push({ type: "Failure", value: failValue });
        });
        return resultArray;
    }

    let convertedArray: ConvertedObject[] = convertArray(outputData);
    const smsArr = convertedArray.slice(0, 2);
    const emailArr = convertedArray.slice(2, 4);
    const pushArr = convertedArray.slice(4, 6);

    smsArr.forEach(item => {
        item.value = Math.round(item.value * 100);
    });
    emailArr.forEach(item => {
        item.value = Math.round(item.value * 100);
    });
    pushArr.forEach(item => {
        item.value = Math.round(item.value * 100);
    });

    console.log("PUSH ARR: ", pushArr)
    const smsData = useMemo(() => {
        if (!smsArr?.length) {
            return [];
        }

        return smsArr
            .map((stage) => ({
                title: stage.type,
                percent: stage.value ?? 0,
            }))
    }, [outputData]);

    const emailData = useMemo(() => {
        if (!emailArr?.length) {
            return [];
        }

        return emailArr
            .map((stage) => ({
                title: stage.type,
                percent: stage.value ?? 0,
            }))
    }, [outputData]);

    const pushData = useMemo(() => {
        if (!pushArr?.length) {
            return [];
        }

        return pushArr
            .map((stage) => ({
                title: stage.type,
                percent: stage.value ?? 0,
            }))
    }, [outputData]);

    const COLORS = [
        "#BAE0FF",
        "#69B1FF",
        "#1677FF",
        "#0958D9",
        "#10239E",
        "#061178",
        "#030852",
        "#03052E",
        "#000B0A",
        "#000000",
    ];

    const smsConfig: PieConfig = {
        width: 200,
        height: 200,
        data: smsData,
        angleField: "percent",
        colorField: "title",
        color: COLORS,
        legend: false,
        radius: 1,
        innerRadius: 0.6,
        label: false,
        syncViewPadding: true,
        statistic: {
            title: false,
            content: false,
        },
    };

    const emailConfig: PieConfig = {
        width: 200,
        height: 200,
        data: emailData,
        angleField: "percent",
        colorField: "title",
        color: COLORS,
        legend: false,
        radius: 1,
        innerRadius: 0.6,
        label: false,
        syncViewPadding: true,
        statistic: {
            title: false,
            content: false,
        },
    };

    const pushConfig: PieConfig = {
        width: 200,
        height: 200,
        data: pushData,
        angleField: "percent",
        colorField: "title",
        color: COLORS,
        legend: false,
        radius: 1,
        innerRadius: 0.6,
        label: false,
        syncViewPadding: true,
        statistic: {
            title: false,
            content: false,
        },
    };

    return (
        <Card
            style={{ height: "100%", width: "700px" }}
            headStyle={{ padding: "8px 16px" }}
            bodyStyle={{
                padding: "32px",
            }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <ProjectOutlined />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Tasks
                    </Text>
                </div>
            }
            extra={
                <Button
                    onClick={() => list("tasks")}
                    icon={<RightCircleOutlined />}
                >
                    See kanban board
                </Button>
            }
        >
            <div
                style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Suspense>
                    <div>
                        <Pie  {...smsConfig} />
                        <Text style={{ display: "flex", justifyContent: "center", fontWeight: "500" }}>SMS</Text>
                    </div>
                    <div>
                        <Pie {...emailConfig} />
                        <Text style={{ display: "flex", justifyContent: "center", fontWeight: "500" }}>EMAIL</Text>
                    </div>
                    <div>
                        <Pie {...pushConfig} />
                        <Text style={{ display: "flex", justifyContent: "center", fontWeight: "500" }}>PUSH</Text>
                    </div>
                </Suspense>
            </div >

            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    marginTop: "48px",
                }}
            >
                {smsArr?.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: "flex",
                            width: "50%",
                            alignItems: "center",
                            marginTop: "8px",
                        }}
                    >
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                backgroundColor: COLORS[index],
                                marginRight: ".5rem",
                            }}
                        />
                        <Text
                            size="md"
                            style={{
                                textTransform: "capitalize",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {item.type.toLowerCase()}
                        </Text>
                    </div>
                ))}
            </div>
        </Card >
    );
};
