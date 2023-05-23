import React, {FC, memo, useState} from "react"
import { Card } from "antd"
import {IoLocationOutline, IoPhonePortraitOutline, IoCalendarClearOutline, IoTrashOutline, IoPencilOutline} from 'react-icons/io5'
import { getClient, setSelectedClient } from "../store/clientsSlice"
import { Client } from "../models"
import styles from '../styles/modules/clientCard.module.css'
import avatar from '../assets/ava.png'
import { rightIconMargin } from "../styles/inLineStyles"
import { useAppDispatch, useAuth } from "../hooks"

interface UserCardProps {
    client: Client
    handlePopups: (type: string, isEdit?: boolean) => void
}

const ClientCard: FC<UserCardProps> = memo(function({client, handlePopups}) {
    const dispatch = useAppDispatch()
    const isLogin = useAuth()

    const [isHovered, setIsHovered] = useState(false)

    const showClient = () => {
        if(isLogin) {
            dispatch(getClient(client.id)).then(() => handlePopups('show_user'))

        }
    }

    const handleDelete = () => {
        setSelectedClient(client)
        handlePopups('removing_user')
    }

    const handleEdit = () => {
        setSelectedClient(client)
        handlePopups('form_user', true)
    }

    return (
        <Card
            bordered={false}
            className={styles.hoverContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>

            {isHovered && <div>
                    <IoPencilOutline size={22} className={styles.hoverPencil} onClick={handleEdit}/>
                    <IoTrashOutline size={22} className={styles.hoverTrash} onClick={handleDelete}/>
                </div>}

            <div onClick={showClient} className={styles.card}>
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
            </div>
        </Card>
    )
})

export default ClientCard