import React, {FC, useEffect, useState} from 'react';
import UserStore, {IUser} from "../../../mobx/stores/user.store";
import {IGraduationProjectForList} from "../CourseList/DiplomeElement";
import {Table} from "@mantine/core";

interface ITeacherWithProject{
    projects: IGraduationProjectForList[]
    user_teacher: IUser
}

interface Test{
    children?: JSX.Element|JSX.Element[];
}

const TeacherProjectList: FC<Test> = () => {
    const [teachersWithProject, setTeachersWithProject] = useState<Array<ITeacherWithProject>>([])

    useEffect(() => {
       UserStore.getTeachersList().then(date => setTeachersWithProject(date))
    },[])
    
    useEffect(() => {
        console.log(teachersWithProject)
    },[teachersWithProject])

    const ths = (
        <thead>
            <tr>
                <th>Студент</th>
                <th>Группа</th>
                <th>Тема</th>
            </tr>
        </thead>
    );

    return (
        <>
            <Table withBorder>
                <thead>{ths}</thead>
                <tbody>
                {teachersWithProject.map(data => {
                    return (
                        <>
                            <tr>{data.user_teacher.name} {data.user_teacher.subgroup} {data.user_teacher.rank}</tr>
                            {data.projects.map(project => (
                                <>
                                <tr>
                                    <td>{project.user.name} {project.user.surname}</td>
                                    <td>{project.user.group.group_name}-{project.user.group.group_number}</td>
                                    <td></td>
                                </tr>
                                </>
                            ))}
                        </>
                    )
                })}
                </tbody>
            </Table>
        </>
    );
};

export default TeacherProjectList;