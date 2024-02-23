import React, { lazy, Suspense, useMemo } from "react";

import { useNavigation } from "@refinedev/core";

import { DollarOutlined, RightCircleOutlined } from "@ant-design/icons";
import { AreaConfig } from "@ant-design/plots";
import { Button, Card } from "antd";
import dayjs from "dayjs";

import { Text } from "@/components";

const Area = lazy(() => import("@ant-design/plots/es/components/area"));

export const DashboardDealsChart: React.FC = () => {
    const { list } = useNavigation();
    // const { isError, error } = useList<
    //     GetFieldsFromList<DashboardDealsChartQuery>
    // >({
    //     resource: "dealStages",
    //     filters: [{ field: "title", operator: "in", value: ["WON", "LOST"] }],
    //     meta: {
    //     },
    // });

    const data = {
        "data": [
            {
                "title": "WON",
                "dealsAggregate": [
                    {
                        "groupBy": {
                            "closeDateMonth": 1,
                            "closeDateYear": 2024
                        },
                        "sum": {
                            "value": 592230
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 2,
                            "closeDateYear": 2024
                        },
                        "sum": {
                            "value": 735598
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 5,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 16699
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 6,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 19918
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 7,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 117932
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 8,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 110360
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 9,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 356367
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 10,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 164753
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 11,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 105488
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 12,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 239845
                        }
                    }
                ]
            },
            {
                "title": "LOST",
                "dealsAggregate": [
                    {
                        "groupBy": {
                            "closeDateMonth": 1,
                            "closeDateYear": 2024
                        },
                        "sum": {
                            "value": 761608
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 2,
                            "closeDateYear": 2024
                        },
                        "sum": {
                            "value": 662376
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 5,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 103212
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 7,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 152436
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 8,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 44537
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 9,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 122718
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 10,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 147692
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 11,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 359001
                        }
                    },
                    {
                        "groupBy": {
                            "closeDateMonth": 12,
                            "closeDateYear": 2023
                        },
                        "sum": {
                            "value": 400699
                        }
                    }
                ]
            }
        ]
    }

    const dealData = useMemo(() => {
        const won = data?.data
            .find((node) => node.title === "WON")
            ?.dealsAggregate.map((item) => {
                const { closeDateMonth, closeDateYear } = item.groupBy!;
                const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);
                return {
                    timeUnix: date.unix(),
                    timeText: date.format("MMM YYYY"),
                    value: item.sum?.value,
                    state: "Won",
                };
            });

        const lost = data?.data
            .find((node) => node.title === "LOST")
            ?.dealsAggregate.map((item) => {
                const { closeDateMonth, closeDateYear } = item.groupBy!;
                const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);
                return {
                    timeUnix: date.unix(),
                    timeText: date.format("MMM YYYY"),
                    value: item.sum?.value,
                    state: "Lost",
                };
            });

        return [...(won || []), ...(lost || [])].sort(
            (a, b) => a.timeUnix - b.timeUnix,
        );
    }, [data]);

    const config: AreaConfig = {
        isStack: false,
        data: dealData,
        xField: "timeText",
        yField: "value",
        seriesField: "state",
        animation: true,
        startOnZero: false,
        smooth: true,
        legend: {
            offsetY: -6,
        },
        yAxis: {
            tickCount: 4,
            label: {
                formatter: (v) => {
                    return `$${Number(v) / 1000}k`;
                },
            },
        },
        tooltip: {
            formatter: (data) => {
                return {
                    name: data.state,
                    value: `$${Number(data.value) / 1000}k`,
                };
            },
        },
        areaStyle: (datum) => {
            const won = "l(270) 0:#ffffff 0.5:#b7eb8f 1:#52c41a";
            const lost = "l(270) 0:#ffffff 0.5:#f3b7c2 1:#ff4d4f";
            return { fill: datum.state === "Won" ? won : lost };
        },
        color: (datum) => {
            return datum.state === "Won" ? "#52C41A" : "#F5222D";
        },
    };

    return (
        <Card
            style={{ height: "100%" }}
            headStyle={{ padding: "8px 16px" }}
            bodyStyle={{ padding: "24px 24px 0px 24px" }}
            title={
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <DollarOutlined />
                    <Text size="sm" style={{ marginLeft: ".5rem" }}>
                        Deals
                    </Text>
                </div>
            }
            extra={
                <Button
                    onClick={() => list("deals")}
                    icon={<RightCircleOutlined />}
                >
                    See sales pipeline
                </Button>
            }
        >
            <Suspense>
                <Area {...config} height={325} />
            </Suspense>
        </Card>
    );
};
