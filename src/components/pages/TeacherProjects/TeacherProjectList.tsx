import React, {FC, useEffect, useState} from 'react';
import TeacherProjectTable from "./TeacherProjectTable";
import UserStore from "../../../mobx/stores/user.store";

const TeacherProjectList: FC = () => {
    const [teachersWithProject, setTeachersWithProject] = useState()

    useEffect(() => {
       UserStore.getTeachersList().then(date => setTeachersWithProject(date))
    },[])
    
    useEffect(() => {
        console.log(teachersWithProject)
    },[teachersWithProject])

    const ths = (
        <tr>
            <th>Студент</th>
            <th>Группа</th>
            <th>Тема</th>
        </tr>
    );

    return (
        <div>
            <thead>{ths}</thead>
            <TeacherProjectTable/>
        </div>
    );
};

export default TeacherProjectList;