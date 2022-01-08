﻿import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import { useContext } from "react"
import { Context } from ".."

const LoginForm: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { store } = useContext(Context)

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Почта"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Пароль"
            />
            <button onClick={() => store.login(email, password)}>Логин</button>
            <button onClick={() => store.registration(email, password)}>Регистрация</button>
        </div>
    )
}

export default observer(LoginForm)