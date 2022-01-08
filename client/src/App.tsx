﻿import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { Context } from "."
import LoginForm from "./components/LoginForm"
import { IUser } from "./models/IUser"
import UserService from "./services/UserService"

const App: React.FC = () => {

    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    if (!store.isAuth) {
        return (
            <LoginForm />
        )
    }

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (error) {

        }
    }

    if (store.isLoading) {
        return <div>Подождите...</div>
    }

    console.log(store.user)

    return (
        <div>
            <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ'}</h1>
            <h1>{store.user.isActivated ? 'Аккаунт подтвержден по почте' : 'ПОДТВЕРДИТЕ ПОЧТУ'}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={() => getUsers()}>Получить пользователей</button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>)}
        </div>
    )
}

export default observer(App)