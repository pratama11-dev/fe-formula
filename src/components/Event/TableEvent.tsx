import handleSessions from "@pages/api/GetSession";
import { Button, Popconfirm, Switch, Table, TableProps, Tag } from "antd";
import { Sessions } from "types/Session";
import { IEvent } from "types/event/index";
import customFooterPagination from "@components/Partial/customFooterPagination";
import moment from "moment";
import getUserRole from "@utils/helpers/getUserRoles";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalEvent from "./ModalEvent";
import { useState } from "react";
import useFetcher from "@api/customHooks/useFetcher";
import { showSuccess } from "@utils/helpers/AntdHelper";
import { useQueryClient } from "@tanstack/react-query";

interface ITableEvent {
    session: Sessions | undefined;
    data?: IEvent[];
    pagination: { current?: number | undefined; pageSize?: number | undefined; total?: number | undefined };
    loading?: boolean;
    onChange?: TableProps<IEvent>["onChange"];
}

const EventTable = ({
    session,
    data,
    pagination,
    loading,
    onChange,
}: ITableEvent) => {
    const role = getUserRole(session)
    const { FetcherPost, isLoading } = useFetcher(session);
    const uq = useQueryClient();

    const [modal, setModal] = useState(false)
    const [selectedData, setSelectedData] = useState<IEvent>()

    const onDelete = async (id: number) => {
        const data = await FetcherPost({
            url: "/api/event/delete",
            api: "API",
            data: {
                id
            }
        })
        if (data.status === 200) {
            showSuccess("Berhasil!", `berhasil menghapus data`)
            uq.invalidateQueries(['useEventQuery'])
        }
    }

    return (
        <>
            <Table
                dataSource={data}
                pagination={pagination}
                onChange={onChange}
                loading={loading}
                rowKey={(d) => d?.id ?? "x"}
                scroll={{
                    x: true,
                }}
                footer={customFooterPagination(pagination)}
            >
                <Table.Column
                    title="No"
                    key="index"
                    dataIndex="index"
                    width="5%"
                    render={(value, item, index) => {
                        if (pagination) {
                            return (
                                ((pagination?.current ?? 1) - 1) *
                                (pagination?.pageSize ?? 10) +
                                index +
                                1
                            );
                        } else {
                            return index + 1;
                        }
                    }}
                />
                <Table.Column
                    title="Event Name"
                    dataIndex="name"
                    render={(_value, item: IEvent) => item?.name ?? "-"}
                />
                <Table.Column
                    title="Event Date"
                    dataIndex="doc_date"
                    render={(_value, item: IEvent) => moment(item?.event_date).format("DD MMMM YYYY")}
                />
                <Table.Column
                    title="Status"
                    dataIndex="status"
                    render={(_value, item: IEvent) => {
                        if (item?.id_status === 1) {
                            return <Tag color="green">{item?.event_status?.name}</Tag>
                        } else {
                            return <Tag color="red">{item?.event_status?.name}</Tag>
                        }
                    }}
                />
                <Table.Column
                    title="Action"
                    dataIndex="Action"
                    render={(_value, item: IEvent) => (
                        <>
                            <Button
                                type="link"
                                icon={<EditOutlined rev={""} />}
                                onClick={() => {
                                    setSelectedData(item)
                                    setModal(true)
                                }}
                            />
                            <Popconfirm
                                title="Delete?"
                                description="Are you sure to delete this data?"
                                onConfirm={() => { onDelete(item?.id as number) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    type="link"
                                    icon={<DeleteOutlined rev={""} />}
                                    danger
                                />
                            </Popconfirm>
                        </>
                    )}
                />
            </Table>

            <ModalEvent
                session={session}
                visible={modal}
                setVisible={setModal}
                data={selectedData}
            />
        </>
    )
}

export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default EventTable;