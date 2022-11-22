import axios from "axios";
import {host} from "../../assets/constants/host.constant";



const getGraduateProjectByStudentId = (user_id: number) => {
    return axios.get(`${host}/graduation-project/get-by-user-id/${user_id}`)
}

const getGraduateProjectsByUserTeacherId = (user_id: number) => {
    return axios.get(`${host}/graduation-project/get-by-user-teacher-id/${user_id}`)
}

const setIsDoneForStage = (stage_id: number) => {
    return axios.post(`${host}/stage-graduation-project/set-is_done/${stage_id}`)
}

const DiplomeService = {
    getGraduateProjectByStudentId,
    getGraduateProjectsByUserTeacherId,
    setIsDoneForStage
}

export default DiplomeService;