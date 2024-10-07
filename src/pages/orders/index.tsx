import { Sessions } from "types/Session";
import handleSessions from "@pages/api/GetSession";
import HeadPage from "@components/Global/Header/HeadPage";
import DashboardLayout from "@layouts/DashboardLayout";
import useNavbar from "@layouts/customHooks/useNavbar";
import { useState } from "react";
import { Col, Input, Row, TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import useDebounce from "@utils/helpers/customHooks/useDebounce";
import useWindowSize from "@utils/helpers/ReactHelper";

import { useOrderQuery, useTicketQuery } from "@services/reactQuery/ticket";
import OrderTable from "@components/Order/OrderTicket";


const TicketsPage = (session: Sessions) => {
    useNavbar(["orders"], [{ name: "Orders", url: "/orders" }]);
    const { isMobile } = useWindowSize();

    const [paginationTable1, setPaginationTable1] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>();
    const debouncedSearch = useDebounce(search, 500);

    const dataListOrder = useOrderQuery({
        session: session,
        pagination: paginationTable1,
        search: debouncedSearch,
        enabled: true,
        filters
    })

    const dataList = dataListOrder?.data?.data?.data

    return (
        <>
            <HeadPage withDefaultCss title="Orders" />
            <DashboardLayout session={session}>
                <Row justify="space-between" align="middle" gutter={[10, 20]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Input.Search
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name event"
                        />
                    </Col>
                </Row>

                <div style={{ height: "10px" }} />

                <OrderTable
                    session={session}
                    data={dataList ?? []}
                    loading={dataListOrder.isLoading}
                    onChange={(pg, ft) => {
                        setPaginationTable1(pg);
                        setFilters(ft);
                    }}
                    pagination={{ ...paginationTable1, total: dataListOrder?.data?.data?.total }}
                />
            </DashboardLayout>
        </>
    )
}

export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default TicketsPage;