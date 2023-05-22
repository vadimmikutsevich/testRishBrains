import React, {useState, useEffect} from "react";
import { Modal, Button } from "antd";
import { logoutUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks";
import styles from '../styles/modules/signOut.module.css'
import { fullScreenModal } from "../styles/inLineStyles";

interface SignOutProps {
    visible: boolean
    handlePopups: (type: string) => void
}

const SignOut: React.FC<SignOutProps> = ({visible, handlePopups}) => {
    const dispatch = useAppDispatch()
    const [isMobile, setIsMobile] = useState(window.innerWidth < 425);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 425);
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

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
            bodyStyle={isMobile ? fullScreenModal : {}}
            destroyOnClose
            className={styles.modal}>
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