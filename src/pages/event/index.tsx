import { Sessions } from "types/Session";
import handleSessions from "@pages/api/GetSession";
import HeadPage from "@components/Global/Header/HeadPage";
import DashboardLayout from "@layouts/DashboardLayout";
import useNavbar from "@layouts/customHooks/useNavbar";
import { useState } from "react";
import { Button, Card, Col, Divider, Flex, Input, Row, Statistic, TablePaginationConfig, Tabs, TabsProps } from "antd";
import { FilterValue } from "antd/es/table/interface";
import useDebounce from "@utils/helpers/customHooks/useDebounce";
import { FaPlus } from "react-icons/fa";
import { PushNavigateTo } from "@utils/helpers/Route";
import useWindowSize from "@utils/helpers/ReactHelper";
import { FaCheck, FaCodeCommit } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import { useEventQuery } from "@services/reactQuery/event";


const EventPage = (session: Sessions) => {
    useNavbar(["event"], [{ name: "Event", url: "/event" }]);
    const { isMobile } = useWindowSize();

    const [paginationTable1, setPaginationTable1] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 10,
        total: 0,
    });

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>();    
    const debouncedSearch = useDebounce(search, 500);

    const dataListEvent = useEventQuery({
        session: session,
        pagination: paginationTable1,
        search: debouncedSearch,
        enabled: true,
        filters
    })

    const dataList = dataListEvent?.data?.data?.data

    return (
        <>
            <HeadPage withDefaultCss title="Event" />
            <DashboardLayout session={session}>

                <Row justify="space-between" align="middle">
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Input.Search
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name event"
                        />
                    </Col>
                </Row>

                <div style={{ height: "10px" }} />

                
            </DashboardLayout>
        </>
    )
}

export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default EventPage;