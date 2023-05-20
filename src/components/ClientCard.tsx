import React, {FC, memo} from "react"
import { Card } from "antd"
import {IoLocationOutline, IoPhonePortraitOutline, IoCalendarClearOutline} from 'react-icons/io5'
import { Client } from "../models"
import styles from '../styles/components/clientCard.module.css'
import avatar from '../assets/ava.png'
import { rightIconMargin } from "../styles/inLineStyles"

interface UserCardProps {
    client: Client
}

const ClientCard: FC<UserCardProps> = memo(function({client}) {
    return (
        <Card bordered={false} className={styles.card}>
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