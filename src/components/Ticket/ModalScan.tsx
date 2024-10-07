import useAuth from "@api/customHooks/useAuth";
import useFetcher from "@api/customHooks/useFetcher";
import { handlingError } from "@pages/_app";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "@utils/helpers/AntdHelper";
import { DatePicker, Form, Input, Modal, Spin, Switch } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IEvent } from "types/event/index";
import { Sessions } from "types/Session";
import dayjs from "dayjs";
import QRCodeScanner from "@components/Scanner/QrScanner";

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
    const [scan, setScan] = useState(false);

    useEffect(() => {
        if (visible) {
            setScan(true);
        } else {
            setScan(false);
        }
    }, [visible]);

    const doScan = async (qr_code?: string) => {
        try {
            const res = await FetcherPost({
                url: "/api/ticket/qr-scan",
                api: "API",
                data: {
                    qr_code
                }
            });

            if (res.status === 200) {
                showSuccess(
                    "Berhasil!",
                    `Berhasil Scan Qr!`
                );
                uq.invalidateQueries([
                    "useTicketQuery",
                ])
                uq.refetchQueries([
                    "useTicketQuery",
                ])
                setScan(false);
                setVisible(false)
            }
        } catch (error) {
            setVisible(false)
            setScan(false);
            handlingError(error, handleLogout);
        }
    }

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
            {isLoading ? (
                <Spin tip="Processing QR Code..." />
            ) : (
                <QRCodeScanner
                    scan={scan}
                    onFinish={(idQr) => {
                        doScan(idQr)
                    }}
                />
            )}
        </Modal>
    </>);
}
export default ModalScan;
