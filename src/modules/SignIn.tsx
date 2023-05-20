import React, {useState} from "react";
import { Modal, Input, Button, message} from "antd";
import { loginUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks";
import styles from '../styles/modules/signIn.module.css';

interface SignInProps {
    visible: boolean
    handlePopups: (type: string) => void
}

const SignIn: React.FC<SignInProps> = ({visible, handlePopups}) => {
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        handlePopups('sign_in')
        dispatch(loginUser({ login, password }))
            .then((data) => {
                if(!data.payload) {
                    return message.error('Something went wrong!')
                }

                return message.success('Logen In successfuly!')
            })
    };

    return (
         <Modal
            open={visible}
            onCancel={() => handlePopups('sign_in')}
            footer={null}
            centered
            destroyOnClose>
                <div className={styles.content}>
                    <h2 className={styles.title}>Sign In</h2>

                    <Input placeholder="Username" onChange={(e) => setLogin(e.target.value)} className={styles.login}/>

                    <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} className={styles.password}/>
                    <div className={styles.buttons}>
                        <Button type="primary" onClick={handleLogin} className={styles.btn}>
                            Sign In
                        </Button>
                        <Button onClick={() => handlePopups('sign_in')} className={styles.btn} type="text">
                            Close
                        </Button>
                    </div>
                </div>

      </Modal>
    )
}

export default SignIn