import React, {useState, useCallback} from "react";
import Header from '../modules/Header'
import Main from "../modules/Main";
import SignIn from "../modules/SignIn";
import SignOut from "../modules/SignOut";
import ClientFormPopup from "../modules/ClientFormPopup";
import ClientPopup from "../modules/ClientPopup";
import RemovingPopup from "../modules/RemovingPopup";
import styles from '../styles/pages/homePage.module.css';

enum Popups {
    SIGN_IN = 'sign_in',
    SIGN_OUT = 'sign_out',
    SHOW_USER = 'show_user',
    FORM_USER = 'form_user',
    REMOVING_USER = 'removing_user'
}

const HomePage: React.FC = () => {
    const [signInPopup, setSignInPopup] = useState(false)
    const [signOutPopup, setSignOutPopup] = useState(false)
    const [clientFormPopup, setClientFormPopup] = useState(false)
    const [clientPopup, setClientPopup] = useState(false)
    const [removingPopup, setRemovingPopup] = useState(false)

    const handlePopups = useCallback((popupType: string) => {
        if(popupType === Popups.SIGN_IN) setSignInPopup(!signInPopup)
        if(popupType === Popups.SIGN_OUT) setSignOutPopup(!signOutPopup)
        if(popupType === Popups.SHOW_USER) setClientPopup(!clientPopup)
        if(popupType === Popups.FORM_USER) setClientFormPopup(!clientFormPopup)
        if(popupType === Popups.REMOVING_USER) setRemovingPopup(!removingPopup)

    }, [clientFormPopup, clientPopup, removingPopup, signInPopup, signOutPopup])

    return (
        <div className={styles.wrapper}>
            <Header handlePopups={handlePopups}/>
            <Main handlePopups={handlePopups}/>

            {signInPopup && <SignIn visible={signInPopup} handlePopups={handlePopups}/>}
            {signOutPopup && <SignOut visible={signOutPopup} handlePopups={handlePopups}/>}
            {clientFormPopup && <ClientFormPopup visible={clientFormPopup} handlePopups={handlePopups}/>}
            {clientPopup && <ClientPopup visible={clientPopup} handlePopups={handlePopups}/>}
            {removingPopup && <RemovingPopup visible={removingPopup} handlePopups={handlePopups}/>}
        </div>
    )
}

export default HomePage