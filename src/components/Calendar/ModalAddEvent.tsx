import { Dispatch, SetStateAction, useState } from "react";
import { Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { handlingError } from "../../pages/_app";
import useAuth from "@api/customHooks/useAuth";
import useFetcher from "@api/customHooks/useFetcher";
import { useQueryClient } from "@tanstack/react-query";
import { useUserQuery } from "@services/reactQuery/users";

const ModalAddEvent = ({
    visible,
    setVisible,
    // session,
    onFinish,
    dataId
}: {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    // session: Sessions;
    onFinish: () => void;
    dataId?: number | undefined
}) => {
    const uq = useQueryClient();

    const { handleLogout } = useAuth();
    const { FetcherPost } = useFetcher();

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [periode, setPeriode] = useState<Date[] | undefined>(undefined);
    const [users, setUsers] = useState<string[]>([]);

    const [form] = useForm();

    const dataUser = useUserQuery({
        enabled: true
    })

    const listUser = dataUser?.data?.data?.data

    const handleEditSubmit = async () => {
        form.validateFields().then(async (d) => {
            setLoading(true);

            try {
                const params = {
                    title: d?.title,
                    date_start: periode?.[0],
                    date_end: periode?.[1],
                    user: users
                }

                const data = await FetcherPost({
                    api: "API",
                    url: "/public/event/add",
                    data: params
                })

                if (data.status === 200) {
                    setVisible(false);
                    onFinish()
                }

            } catch (error) {
                handlingError(error, handleLogout);
            }
            form.resetFields();
            uq.invalidateQueries(['useCalendarQuery'])
            uq.refetchQueries(['useCalendarQuery'])
            setLoading(false);
            setVisible(false);
        });
    }

    const options = listUser?.map((d) => {
        return {
            label: `${d.name}`,
            value: `${d?.name}`
        }
    })

    return (
        <>
            <Modal
                open={visible}
                title="Add Event"
                onCancel={async () => {
                    setVisible(false);
                }}
                onOk={() => {
                    handleEditSubmit()
                }}
                okButtonProps={{ loading: loading }}
            >
                <Form
                    form={form}
                    layout="horizontal"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
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
                        {/* <Checkbox checked={checked} onChange={(e) => {setChecked(e.target.checked)}}>
                            For multiple?
                        </Checkbox> */}
                        <DatePicker.RangePicker
                            picker="date"
                            showTime
                            allowClear
                            style={{ width: "100%" }}
                            onChange={(date: any) => {
                                setPeriode(date);
                            }}
                        />

                    </Form.Item>

                    <Form.Item
                        label="Select Name"
                        name="name"
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Search or create name"
                            options={options}
                            onChange={(value) => setUsers(value as string[])} // Cast value to string array
                            labelInValue={false} // Ensure it returns only strings
                            showSearch
                            allowClear
                        />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default ModalAddEvent;
