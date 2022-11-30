import React, {FC} from 'react';
import TeacherProjectTable from "./TeacherProjectTable";

const TeacherProjectList: FC = () => {

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