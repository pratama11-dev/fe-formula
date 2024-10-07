import useAuth from "@api/customHooks/useAuth";
import useFetcher from "@api/customHooks/useFetcher";
import { handlingError } from "@pages/_app";
import { useQueryClient } from "@tanstack/react-query";
import { showSuccess } from "@utils/helpers/AntdHelper";
import { DatePicker, Form, Input, Modal, Switch } from "antd";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IEvent } from "types/event/index";
import { Sessions } from "types/Session";
import dayjs from "dayjs";

const ModalEvent = ({
    session,
    visible,
    setVisible,
    data
}: {
    session: Sessions | undefined;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    data?: IEvent
}) => {
    const uq = useQueryClient();

    const [form] = Form.useForm();
    const { FetcherPost, isLoading } = useFetcher(session);
    const { handleLogout } = useAuth();

    const handleSubmit = async () => {
        form.validateFields()
            .then(async values => {
                let url = "/api/event/add"

                const params:{
                    name: string,
                    event_date: string,
                    id_status?: number,
                    id_event?: number
                } = {
                    name: values?.name,
                    event_date: values?.event_date?.toISOString(),
                }

                if (data) {
                    url = "/api/event/update"
                    params.id_status = values.id_status ? 1 : 2;
                    params.id_event = data?.id
                }

                const res = await FetcherPost({
                    url: url,
                    api: "API",
                    data: params
                });

                if (res.status === 200) {
                    showSuccess(
                        "Berhasil!",
                        `Berhasil Membuat Event!`
                    );
                    uq.invalidateQueries([
                        "useEventQuery",
                    ])
                    uq.refetchQueries([
                        "useEventQuery",
                    ])

                    setVisible(false)
                }
            })
            .catch(errorInfo => {
                handlingError(errorInfo, handleLogout);
            });
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                name: data?.name,
                event_date: data.event_date ? dayjs(data.event_date) : null
            })
        }
    }, [data, visible])


    return (<>
        <Modal
            open={visible}
            // width={"1200px"}
            onCancel={() => {
                setVisible(false);
                form.resetFields();
            }}
            onOk={() => {
                handleSubmit()
            }}
            title={`${data ? "Edit" : "Add"} Event`}
        >
            <Form form={form} layout="vertical" style={{ padding: 10 }}>
                <Form.Item
                    name="name"
                    label="Event Name"
                    required
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="event_date"
                    label="Event Date"
                    required
                >
                    <DatePicker
                        format=""
                        style={{ width: "100%" }}
                    />
                </Form.Item>
                {data && (
                    <Form.Item
                        name="id_status"
                        label="Is Active?"
                        required
                    >
                        <Switch 
                            checked={data?.id_status === 1}
                            // onChange={(e) => 
                            //     console.log(e)
                            // }
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    </>);
}
export default ModalEvent;
