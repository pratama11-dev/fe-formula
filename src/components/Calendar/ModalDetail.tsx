import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button, Col, DatePicker, Divider, Dropdown, Form, Input, List, MenuProps, Modal, Row, Select, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { handlingError } from "../../pages/_app";
import useAuth from "@api/customHooks/useAuth";
import useFetcher from "@api/customHooks/useFetcher";
import { useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "@services/reactQuery/users";
import { useDetailEventQuery } from "@services/reactQuery/calendar";
import DocElement from "@components/Util/DocElement";
import UnitConvert from "@components/Util/UnitConvert";
import { DeleteOutlined, EditOutlined, EditTwoTone } from "@ant-design/icons";

const ModalDetailEvent = ({
    visible,
    setVisible,
    onFinish,
    id
}: {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    onFinish: () => void;
    id?: number | undefined
}) => {
    const uq = useQueryClient();

    const { FetcherPost } = useFetcher();
    const { handleLogout } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [forEdit, setForEdit] = useState<boolean>(false)
    const [periode, setPeriode] = useState<Date[] | undefined>();

    const dataDetail = useDetailEventQuery({
        enabled: id != undefined ? true : false,
        id: id
    })
    const [form] = useForm();

    const data = dataDetail?.data?.data?.data

    const handleDelete = async () => {
        setLoading(true);

        try {
            const data = await FetcherPost({
                api: "API",
                url: `/public/event/delete/${id}`,
                data: {}
            })

            if (data.status === 200) {
                setVisible(false);
                onFinish()
            }

        } catch (error) {
            handlingError(error, handleLogout);
        }
        uq.invalidateQueries(['useCalendarQuery'])
        uq.refetchQueries(['useCalendarQuery'])
        setLoading(false);
        setVisible(false);
    }

    const handleUpdate = async () => {
        form.validateFields().then(async (d) => {
            setLoading(true);

            try {
                const params = {
                    id: parseInt(id?.toString() ?? ""),
                    title: d?.title,
                    date_start: periode?.[0],
                    date_end: periode?.[1],
                }

                const data = await FetcherPost({
                    api: "API",
                    url: `/public/event/edit`,
                    data: params
                })

                if (data.status === 200) {
                    setVisible(false);
                    onFinish()
                }

            } catch (error) {
                handlingError(error, handleLogout);
            }
            uq.invalidateQueries(['useCalendarQuery'])
            uq.refetchQueries(['useCalendarQuery'])
            setLoading(false);
            setVisible(false);
        })
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a onClick={() => { setForEdit(true) }}>
                    Edit this Event
                </a>
            ),
            icon: <EditOutlined rev={""} />,
        },
        {
            key: '2',
            label: (
                <a onClick={() => { handleDelete() }}>
                    Delete tbis Event
                </a>
            ),
            icon: <DeleteOutlined rev={""} />,
        },
    ];

    useEffect(() => {
        if (forEdit) {
            const startEvent = data?.start_event ? new Date(data.start_event) : undefined;
            const endEvent = data?.end_event ? new Date(data.end_event) : undefined;
            setPeriode(startEvent && endEvent ? [startEvent, endEvent] : undefined);
            form.setFieldsValue({
                title: data?.title,
            });
        }

        return () => { }
    }, [forEdit])

    return (
        <>
            <Modal
                open={visible}
                title="Detail Event"
                footer={false}
                onCancel={async () => {
                    setVisible(false);
                    onFinish()
                }}
                // onOk={() => {
                //     handleEditSubmit()
                // }}
                width={800}
                okButtonProps={{ loading: loading }}
            >
                <Divider style={{ margin: 0 }} />
                {!forEdit && (
                    <Row style={{ marginTop: 10 }}>
                        <Col span={20}>
                            <DocElement label="Title" data={data?.title} />
                            <DocElement label="Start Event" data={UnitConvert?.FormatDateClassic(data?.start_event)} />
                            <DocElement label="End Event" data={UnitConvert?.FormatDateClassic(data?.end_event)} />
                        </Col>
                        <Col span={4}>
                            <Dropdown menu={{ items }}>
                                <Button
                                    icon={<EditOutlined rev="label" />}
                                    ghost
                                    danger
                                    type="link"
                                    style={{ marginRight: "10px", float: "right" }}
                                >
                                    Setting
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                )}
                {forEdit && (
                    <>
                        <Form
                            form={form}
                            layout="horizontal"
                            labelCol={{ span: 2 }}
                            wrapperCol={{ span: 22 }}
                            style={{ margin: 10 }}
                        >
                            <Form.Item
                                name="title"
                                label="Title"
                                required
                                rules={[
                                    {
                                        required: true,
                                        message: "Title is required",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="date"
                                label="Date"
                            >
                                <DatePicker.RangePicker
                                    picker="date"
                                    showTime
                                    allowClear
                                    // defaultValue={dayjs(periode)}
                                    style={{ width: "100%" }}
                                    onChange={(date: any) => {
                                        setPeriode(date);
                                    }}
                                />

                            </Form.Item>
                            <Row justify={"end"}>
                                <Button
                                    onClick={() => setForEdit(false)}
                                    loading={loading}
                                    type="default"
                                    style={{ marginRight: "10px" }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => handleUpdate()}
                                    loading={loading}
                                    type="primary"
                                    style={{ marginRight: "10px" }}
                                >
                                    Save
                                </Button>
                            </Row>

                        </Form>
                    </>
                )}
                {!forEdit && (
                    <List
                        size="small"
                        // bordered
                        header={<div style={{ fontWeight: "bolder", marginTop: 0 }}>Users on this event</div>}
                        dataSource={data?.user_event ?? []}
                        renderItem={(item) => <List.Item>- {item?.user?.name}</List.Item>}
                    />
                )}
            </Modal>
        </>
    );
};

export default ModalDetailEvent;
