import { host } from "../../assets/constants/host.constant";
import axios from 'axios'

export interface ILoginUser {
    username : string;
    password: string;
}

class UserService {
    login = async  (user: ILoginUser) => {
        return axios.post(`${host}/auth/login-test`, JSON.stringify(`grant_type&username=${user.username}&password=${user.password}&scope=&client_id=&client_secret=`))
    }
    logout = async () => {
        return axios.post(`${host}/auth/logout`, {}, {withCredentials: true})
    }
    refresh = async () => {
        return axios.get(`${host}/user/me`, {withCredentials: true})
    }
    getUserById = async (id: string | undefined) => {
        return fetch(`${host}/user/${id}`).then(data => data.json())
    }

    getAllUsers = async () => {
        return fetch(`${host}/user/`).then(data => data.json())
    }
}

export default UserService