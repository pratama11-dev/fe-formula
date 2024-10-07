import handleSessions from "@pages/api/GetSession";
import { Image, Table, TableProps, Tag } from "antd";
import { Sessions } from "types/Session";
import { IEvent } from "types/event/index";
import customFooterPagination from "@components/Partial/customFooterPagination";
import getUserRole from "@utils/helpers/getUserRoles";
import { useQueryClient } from "@tanstack/react-query";
import { IOrders } from "types/ticket/index";
import UnitConvert from "@components/Util/UnitConvert";

interface IOrderTicket {
    session: Sessions | undefined;
    data?: IOrders[];
    pagination: { current?: number | undefined; pageSize?: number | undefined; total?: number | undefined };
    loading?: boolean;
    onChange?: TableProps<IOrders>["onChange"];
}

const OrderTable = ({
    session,
    data,
    pagination,
    loading,
    onChange,
}: IOrderTicket) => {
    const role = getUserRole(session)
    const uq = useQueryClient();

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
                    title="Order Owner"
                    dataIndex="order-owner"
                    render={(_value, item: IOrders) => item?.user?.name }
                />
                <Table.Column
                    title="NISN/NIK"
                    dataIndex="no_document"
                    render={(_value, item: IOrders) => item?.user?.no_document }
                />
                <Table.Column
                    title="Total Price"
                    dataIndex="total_price"
                    render={(_value, item: IOrders) => UnitConvert?.FormatCurrency(item?.total_price, "IDR") }
                />
                <Table.Column
                    title="Amount"
                    dataIndex="amount"
                    render={(_value, item: IOrders) => item?.total_amount}
                />
                <Table.Column
                    title="Status"
                    dataIndex="status"
                    render={(_value, item: IOrders) => {
                        if (item?.id_status === 1) {
                            return <Tag color="red">{item?.order_status?.status}</Tag>
                        } else {
                            return <Tag color="green">{item?.order_status?.status}</Tag>
                        }
                    }}
                />
                <Table.Column
                    title="Action"
                    dataIndex="Action"
                    render={(_value, item: IEvent) => (
                        <>
                            {/* <Button
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
                            </Popconfirm> */}
                        </>
                    )}
                />
            </Table>
        </>
    )
}

export async function getServerSideProps(context: any) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}

export default OrderTable;