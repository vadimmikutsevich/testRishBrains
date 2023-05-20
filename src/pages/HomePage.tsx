import React, {useState} from "react";
import Header from '../modules/Header'
import Main from "../modules/Main";
import SignIn from "../modules/SignIn";
import SignOut from "../modules/SignOut";
import styles from '../styles/pages/homePage.module.css';

enum Popups {
    SIGN_IN = 'sign_in',
    SIGN_OUT = 'sign_out'
}

const HomePage: React.FC = () => {
    const [signInPopup, setSignInPopup] = useState(false)
    const [signOutPopup, setSignOutPopup] = useState(false)

    const handlePopups = (popupType: string) => {
        if(popupType === Popups.SIGN_IN) setSignInPopup(!signInPopup)
        if(popupType === Popups.SIGN_OUT) setSignOutPopup(!signOutPopup)
    }

    return (
        <div className={styles.wrapper}>
            <Header handlePopups={handlePopups}/>
            <Main />

            {signInPopup && <SignIn visible={signInPopup} handlePopups={handlePopups}/>}
            {signOutPopup && <SignOut visible={signOutPopup} handlePopups={handlePopups}/>}
        </div>
    )
}

export default HomePage