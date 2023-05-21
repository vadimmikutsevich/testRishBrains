import React from "react";
import { Modal, Button } from "antd";
import { IoTrashOutline, IoPencilOutline, IoLocationOutline, IoPhonePortraitOutline, IoCalendarClearOutline } from "react-icons/io5";

import { useAppSelector } from "../hooks";
import avatar from '../assets/ava.png'
import styles from '../styles/modules/clientPopup.module.css'
import { rightIconMargin } from "../styles/inLineStyles";

interface ClientPopupProps {
    visible: boolean
    handlePopups: (type: string) => void
}

const ClientPopup: React.FC<ClientPopupProps> = ({visible, handlePopups}) => {

    const client = useAppSelector(state => state.clientsReducer.selectedClient)

    return (
        <Modal
            open={visible}
            onCancel={() => handlePopups('show_user')}
            footer={null}
            centered
            destroyOnClose>
            <div className={styles.content}>
                <div className={styles.buttons}>
                    <Button type="text" className={styles.btn}>
                        <IoPencilOutline size={18} style={rightIconMargin} color="#313131"/>
                        <span className={styles.btnText} style={{color: '#313131'}}>Edit profile</span>
                    </Button>

                    <Button danger type="text" className={styles.btn}>
                        <IoTrashOutline size={18} style={rightIconMargin}/>
                        <span className={styles.btnText}>Delete user</span>
                    </Button>

                </div>

                <img src={avatar} alt="avatar" className={styles.avatar}/>

                <h2 className={styles.title}>
                    {client?.name + ' ' + client?.surname}
                </h2>

                <p className={styles.country}>
                    <IoLocationOutline size={24} style={rightIconMargin} color="#87898F"/>
                    <span>
                        {client?.country}
                    </span>
                </p>
                <p className={styles.phone}>
                    <IoPhonePortraitOutline size={24} style={rightIconMargin} color="#87898F"/>
                    <span>
                        {client?.phone}
                    </span>
                </p>
                <p className={styles.age}>
                    <IoCalendarClearOutline size={24} style={rightIconMargin} color="#87898F"/>
                    <span>
                        {client?.age} y.o
                    </span>
                </p>
            </div>

            <div className={styles.closeBtn}>
                <Button type="text" onClick={() => handlePopups('show_user')}>
                    <span className={styles.btnText} style={{color: '#313131'}}>Close</span>
                </Button>
            </div>
        </Modal>
    )
}

export default ClientPopup