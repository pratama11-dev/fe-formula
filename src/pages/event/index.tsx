import { Sessions } from "types/Session";
import handleSessions from "@pages/api/GetSession";
import HeadPage from "@components/Global/Header/HeadPage";
import DashboardLayout from "@layouts/DashboardLayout";
import useNavbar from "@layouts/customHooks/useNavbar";
import { useState } from "react";
import { Button, Col, Input, Row, TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";
import useDebounce from "@utils/helpers/customHooks/useDebounce";
import useWindowSize from "@utils/helpers/ReactHelper";
import { useEventQuery } from "@services/reactQuery/event";
import EventTable from "@components/Event/TableEvent";
import ModalEvent from "@components/Event/ModalEvent";
import { PlusOutlined } from "@ant-design/icons";


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
    const [modal, setModal] = useState(false)
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

                <Row justify="space-between" align="middle" gutter={[10, 20]}>
                    <Col xs={20} sm={20} md={20} lg={20}>
                        <Input.Search
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name event"
                        />
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <Button
                            // loading={isLoading}
                            onClick={() => { setModal(true) }}
                            block={isMobile}
                            type="primary"
                            style={{ width: "100%" }}
                            icon={<PlusOutlined rev={""} />}
                        >
                            {isMobile ? "" : "Add Event"}
                        </Button>
                    </Col>
                </Row>

                <div style={{ height: "10px" }} />

                <EventTable
                    session={session}
                    data={dataList ?? []}
                    loading={dataListEvent.isLoading}
                    onChange={(pg, ft) => {
                        setPaginationTable1(pg);
                        setFilters(ft);
                    }}
                    pagination={{ ...paginationTable1, total: dataListEvent?.data?.data?.total }}
                />

                <ModalEvent 
                    session={session}
                    visible={modal}
                    setVisible={setModal}
                />

            </DashboardLayout>
        </>
    )
}

export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default EventPage;