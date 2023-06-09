import React, {useState, useEffect, useCallback} from "react";
import { Modal, Input, Button, message } from "antd";
import { IoCalendarOutline, IoPhonePortraitOutline, IoTrashOutline } from "react-icons/io5";
import CountrySelect from "../components/CountrySelect";

import { useAppDispatch, useAppSelector } from "../hooks";
import {Client} from '../models'
import styles from '../styles/modules/clientForm.module.css'
import { fullScreenModal } from "../styles/inLineStyles";
import { rightIconMargin } from "../styles/inLineStyles";
import avatar from '../assets/ava.png'
import { addClient, editClient } from "../store/clientsSlice";

interface ClientFormPopupProps {
    visible: boolean
    handlePopups: (type: string) => void
    isEdit: boolean
}

const ClientFormPopup: React.FC<ClientFormPopupProps> = ({visible, handlePopups, isEdit}) => {
    const dispatch = useAppDispatch()
    const client = useAppSelector(state => state.clientsReducer.selectedClient)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [clientData, setClientData] = useState({
        name: '',
        surname: '',
        age: '0',
        country: '',
        phone: ''
    }) 

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData({...clientData, name: e.target.value})
    }

    const handleSurnameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData({...clientData, surname: e.target.value})
    }

    const handleAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData({...clientData, age: e.target.value})
    }

    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientData({...clientData, phone: e.target.value})
    }
    
    const handleCountry = useCallback((value: string) => {
        setClientData(prevClientData => ({...prevClientData, country: value}))
    }, [])

    const handleSubmit = () => {
        if(isEdit) {
            dispatch(editClient({...clientData, id: client?.id as string})).then((data) => {
                handlePopups('form_user')

                if(!data.payload) {
                   return  message.error('Something went wrong!')
                } 
                   return message.success('Client was edited successfuly!')
            })
        } else {
            dispatch(addClient(clientData)).then((data) => {
                handlePopups('form_user')

                if(!data.payload) {
                  return message.error('Something went wrong!')
                } 
                  return message.success('Client was edited successfuly!')
                
            })
        }
    }

    useEffect(() => {
        if(isEdit) {
            setClientData({...client} as Client)
        }

    }, [client, isEdit])

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Modal
            open={visible}
            width={800}
            onCancel={() => handlePopups('form_user')}
            footer={null}
            centered
            bodyStyle={isMobile ? fullScreenModal : {}}
            destroyOnClose
            className={styles.modal}>
                <div className={styles.content}>
                    <h2 className={styles.title}>
                        {isEdit ? 'Edit client' : 'New client'}
                    </h2>

                    <div className={styles.clientInfo}>
                        <div>
                            <img src={avatar} alt="avatar" className={styles.img}/>
                        </div>

                        <div className={styles.inputsBlock}>
                            <div className={styles.nameInputs}>
                                <div className={styles.nameBlock}>
                                    <span className={styles.inputLabel}>First name</span>
                                    <Input className={styles.shortInput} size="large" value={clientData.name} onChange={handleNameInput}/>
                                </div>
                                <div className={styles.nameBlock}>
                                    <span className={styles.inputLabel}>Last name</span>
                                    <Input className={styles.shortInput} size="large" value={clientData.surname} onChange={handleSurnameInput}/>
                                </div>

                            </div>

                            <div className={styles.longInputContainer}>
                                <span className={styles.inputLabel}>Number of years</span>
                                <Input value={clientData.age} size="large" onChange={handleAge} prefix={<IoCalendarOutline size={20} color="#87898F"/>} placeholder="35"/>
                            </div>

                            <div className={styles.longInputContainer}>
                                <span className={styles.inputLabel}>Country</span>
                                <CountrySelect value={clientData.country} handleCountry={handleCountry}/>
                            </div>

                            <div className={styles.longInputContainer}>
                                <span className={styles.inputLabel}>Telephone</span>
                                <Input value={clientData.phone} size="large" onChange={handlePhone} prefix={<IoPhonePortraitOutline size={20} color="#87898F"/>} placeholder="+44 112 334 5678"/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <div className={styles.usualButtons}>
                            <Button type="primary" size="large" style={{marginRight: 10}} onClick={handleSubmit} className={styles.btn}>
                                <span className={styles.btnText}>Save</span>
                            </Button>
                            <Button size="large" type="text" onClick={() => handlePopups('form_user')} className={styles.btn}>
                                <span className={styles.btnText}>Cancel</span>
                            </Button>
                        </div>

                        <div className={styles.deleteBlock}>
                            {isEdit && <Button danger type="text" className={styles.deleteBtn} onClick={() => {handlePopups('removing_user'); handlePopups('form_user')}}>
                                            <IoTrashOutline size={18} style={rightIconMargin}/>
                                            <span className={styles.btnText}>Delete user</span>
                                        </Button>}
                        </div>
                    </div>
                </div>

        </Modal>
    )
}

export default ClientFormPopup