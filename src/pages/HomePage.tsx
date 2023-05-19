import React from "react";
import Header from '../modules/Header'
import Main from "../modules/Main";
import styles from '../styles/pages/homePage.module.css'

const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Main />
        </div>
    )
}

export default HomePage