import React from "react";
import { Modal, Button } from "antd";
import { logoutUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks";
import styles from '../styles/modules/signOut.module.css'

interface SignOutProps {
    visible: boolean
    handlePopups: (type: string) => void
}

const SignOut: React.FC<SignOutProps> = ({visible, handlePopups}) => {
    const dispatch = useAppDispatch()

    const hangleLogout = () => {
        dispatch(logoutUser())
        handlePopups('sign_out')
    }

    return (
         <Modal
            open={visible}
            onCancel={() => handlePopups('sign_out')}
            footer={null}
            centered
            destroyOnClose>
                <div className={styles.content}>
                    <h2 className={styles.title}>Sign Out</h2>

                    <p className={styles.confirmMessage}>Are you sure you want to sign out?</p>

                    <div className={styles.buttons}>
                        <Button type="primary" onClick={hangleLogout} className={styles.btn}>
                            Yes, sign out
                        </Button>
                        <Button onClick={() => handlePopups('sign_out')} className={styles.btn} type="text">
                            No, close
                        </Button>
                    </div>
                </div>
        </Modal>
    )
}

export default SignOut