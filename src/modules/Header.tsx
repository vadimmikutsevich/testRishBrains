/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from "react"
import { Dropdown, Button } from 'antd'
import {IoLogInOutline, IoPersonOutline, IoChevronDownOutline} from 'react-icons/io5'
import { useAuth } from "../hooks"
import logo from '../assets/logo.png'
import shortLogo from '../assets/short-logo.png'
import styles from '../styles/modules/header.module.css'
import { leftIconMargin, rightIconMargin } from "../styles/inLineStyles"

interface HeaderProps {
    handlePopups: (type: string) => void
}

const Header: FC<HeaderProps> = ({handlePopups}) => {
    const isUserLoggedIn = useAuth()
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
       handlePopups('sign_out')
    };

    const items = [
        {
            key: 1,
            label: (
                <a onClick={handleLogout} className={styles.signOutBtn}>
                    <span className={styles.buttonText}>Sign Out</span>
                </a>
            )
        }
    ]

    return (
        <header className={styles.header}>
            <div className={styles.companyBlock}>
                <img src={isMobile ? shortLogo : logo} alt="logo" className={styles.companyTitleLogo}/>
            </div>

            <nav className={styles.nav}>
                <h3 className={styles.subTitle}>Clients</h3>

                {isUserLoggedIn ? (
                    <Dropdown menu={{items}} trigger={['hover']} className={styles.userDropDown}>
                        <a onClick={(e) => e.preventDefault()}>
                            <IoPersonOutline size={20} style={rightIconMargin}/>
                            <span>
                                a.gerasimov
                            </span>
                            <IoChevronDownOutline size={14} style={leftIconMargin} color="#87898F"/>
                        </a>
                    </Dropdown>
                ) : (
                    <Button className={styles.button} type="primary" onClick={() => handlePopups('sign_in')}>
                        <IoLogInOutline size={24} style={rightIconMargin}/>
                        <span className={styles.buttonText}>
                            {!isMobile && 'Sign In' }
                        </span>
                    </Button>
                )}
            </nav>
        </header>
    )
}

export default Header