import React from "react";


import { Col, Row } from "antd";


import {
    DashboardDealsChart,
    DashboardTasksChart,
} from "./components";

export const DashboardPage: React.FC = () => {
    // const { data, isLoading } = useCustom<DashboardTotalCountsQuery>({
    //     url: "",
    //     method: "get",
    //     meta: {},
    // });

    return (
        <div className="page-container">
            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: "32px",
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    xl={16}
                    style={{
                        height: "432px",
                    }}
                >
                    <DashboardDealsChart />
                </Col>
            </Row>

            <Row
                gutter={[32, 32]}
                style={{
                    marginTop: "32px",
                }}
            >
                <Col
                    xs={24}
                    sm={24}
                    xl={8}
                    style={{
                        height: "448px",
                    }}
                >
                    <DashboardTasksChart />
                </Col>
            </Row>
        </div>
    );
};
