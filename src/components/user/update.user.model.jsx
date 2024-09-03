import { useEffect, useState } from "react";
import { Input, notification, Modal } from 'antd';
import { createUserAPI, updateUserAPI } from "../../services/api.service";

const UpdateUserModel = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        console.log("dataUpdate props: ", dataUpdate)
        if (dataUpdate) {
            setId(dataUpdate._id)
            setFullName(dataUpdate.fullName);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate])

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        if (res.data) {
            notification.success({
                message: "Update user",
                description: "cap nhat user thanh cong"
            })
            resetAndCloseModel();
            await loadUser();
        } else {
            notification.error({
                message: "Update user",
                description: JSON.stringify(res.message)
            })
        }
    }
    const resetAndCloseModel = () => {
        setIsModalUpdateOpen(false)
        setId("")
        setFullName("");
        setPhone("");
        setDataUpdate(null)
    }

    return (
        <Modal
            title="Update a User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => resetAndCloseModel()}
            maskClosable={true}
            okText={"SAVE"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        onChange={(event) => { setId(event.target.value) }}
                        disabled={true}
                    />
                </div>
                <div>
                    <span>Full Name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => { setFullName(event.target.value) }}
                    />
                </div>
                <div>
                    <span>Phone number</span>
                    <Input
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default UpdateUserModel;