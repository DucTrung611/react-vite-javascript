import { useEffect, useState } from "react";
import UserForm from "../components/user/user.form";
import UserTable from "../components/user/user.table";
import { fetchAllUerAPI } from "../services/api.service";

const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        console.log("run useEffect")
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await fetchAllUerAPI();
        setDataUser(res.data)
    }
    return (
        <div>
            <UserForm loadUser={loadUser} />
            <UserTable dataUser={dataUser} loadUser={loadUser} />
        </div>
    )
}

export default UserPage;