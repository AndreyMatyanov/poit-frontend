import {observer} from "mobx-react-lite";
import {FC, memo, useEffect, useState} from "react";
import UserStore, {IUser} from "../../../mobx/stores/user.store";
import s from './UserList.module.sass'
import {Link} from "react-router-dom";

const UserList: FC = observer(() => {
    const [users, setUsers] = useState<Array<IUser> | null>(null)
    useEffect(() => {
        UserStore.getAllUsers().then(usersDB => setUsers(usersDB))
    }, [])

    return (
        <div>
            {users?.map(user => (
                <div className={s.userlist}>
                    <div className={s.userlist__user}>
                        <Link to={`/users/${user.id}`}>{user.name} {user.surname}</Link>
                        {user.role == "TEACHER" ? (<div>Преподаватель</div>) : (<div>Студент</div>)}
                    </div>
                </div>
            ))}
        </div>
    )
})

export default memo(UserList)