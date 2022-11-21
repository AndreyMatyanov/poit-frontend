import React, { FC, ReactNode, memo } from 'react';
import { observer } from 'mobx-react-lite';
import {Admin, ListGuesser, Resource} from 'react-admin';
import jsonServerProvider from "ra-data-json-server";
import {UserList} from "./User/users";

const AdminPage: FC = observer(() => {

    const dataProvider = jsonServerProvider('http://localhost:8000/publication');
    return (
        <Admin basename="/admin" dataProvider={dataProvider}>
            <Resource name="posts" list={ListGuesser} />
        </Admin>
    )
})

export default memo(AdminPage)