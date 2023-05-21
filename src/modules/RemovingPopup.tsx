import React from "react";
import { Modal, Button, message } from "antd";

import styles from '../styles/modules/removingPopup.module.css'
import { removeClient } from "../store/clientsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

interface RemovingPopupProps {
    visible: boolean
    handlePopups: (type: string) => void
}

const RemovingPopup: React.FC<RemovingPopupProps> = ({visible, handlePopups}) => {
    const dispatch = useAppDispatch()
    const client = useAppSelector(state => state.clientsReducer.selectedClient)

    const handleRemove = () => {
        dispatch(removeClient(client?.id as string)).then((data) => {
            handlePopups('removing_user')
            
            if(!data.payload) {
                return message.error('Something went wrong!')
            }

            return message.success('Client was deleted successfuly!')
        })
    }

    const handleClose = () => {
        handlePopups('show_user')
        handlePopups('removing_user')
    }

    return (
        <Modal
            open={visible}
            onCancel={() => handlePopups('removing_user')}
            footer={null}
            centered
            destroyOnClose>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        DELETE
                    </h2>

                    <p className={styles.confirmMessage}>
                        Are you sure you want to delete client?
                    </p>

                    <div className={styles.buttons}>
                        <Button className={styles.submitBtn} onClick={handleRemove}>
                            Yes, delete
                        </Button>

                        <Button className={styles.closeBtn} type="text" onClick={handleClose}>
                            No, close
                        </Button>
                    </div>
                </div>

        </Modal>
    )
}

export default RemovingPopup