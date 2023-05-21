import React, {FC, memo} from "react"
import { Card } from "antd"
import {IoLocationOutline, IoPhonePortraitOutline, IoCalendarClearOutline} from 'react-icons/io5'
import { getClient } from "../store/clientsSlice"
import { Client } from "../models"
import styles from '../styles/modules/clientCard.module.css'
import avatar from '../assets/ava.png'
import { rightIconMargin } from "../styles/inLineStyles"
import { useAppDispatch, useAuth } from "../hooks"

interface UserCardProps {
    client: Client
    handlePopups: (type: string) => void
}

const ClientCard: FC<UserCardProps> = memo(function({client, handlePopups}) {
    const dispatch = useAppDispatch()
    const isLogin = useAuth()

    const showClient = () => {
        if(isLogin) {
            dispatch(getClient(client.id)).then(() => handlePopups('show_user'))

        }
    }

    return (
        <Card bordered={false} className={styles.card} onClick={showClient}>
            <img src={avatar} alt="avatar" className={styles.avatar}/>

            <p className={styles.name}>
                {client.name + ' ' + client.surname}
            </p>
            <p className={styles.country}>
                <IoLocationOutline size={24} style={rightIconMargin} color="#87898F"/>
                <span>
                    {client.country}
                </span>
            </p>
            <p className={styles.phone}>
                <IoPhonePortraitOutline size={24} style={rightIconMargin} color="#87898F"/>
                <span>
                    {client.phone}
                </span>
            </p>
            <p className={styles.age}>
                <IoCalendarClearOutline size={24} style={rightIconMargin} color="#87898F"/>
                <span>
                    {client.age} y.o
                </span>
            </p>
        </Card>
    )
})

export default ClientCard