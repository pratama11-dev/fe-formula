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

const ModalScan = ({
    session,
    visible,
    setVisible,
}: {
    session: Sessions | undefined;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
    const uq = useQueryClient();

    const [form] = Form.useForm();
    const { FetcherPost, isLoading } = useFetcher(session);
    const { handleLogout } = useAuth();


    return (<>
        <Modal
            open={visible}
            // width={"1200px"}
            onCancel={() => {
                setVisible(false);
                form.resetFields();
            }}
            onOk={() => {
                // handleSubmit()
            }}
            title={`Scan Ticket`}
        >
        </Modal>
    </>);
}
export default ModalScan;
