import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Login from '/components/login';
import style from '/styles/Nav.module.css';
import logo from '/public/logo.png';

const Nav = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={`${style.container} ${showMenu ? style.shrink : ''}`}>
            <div>
                <Link href="/">
                    <Image className={style.image} alt='logo' src={logo} height="120%" width="200%" />
                </Link>
            </div>
            <div className={style.login}>
                <Login />
            </div>
            <button className={style.menuButton} onClick={() => setShowMenu(!showMenu)}>
                MENU
            </button>
            <div className={`${style.nav} ${showMenu ? style.show : ''}`}>
                <NavItem href="/" text="INICIO" />
                <NavItem href="/local" text="LOCAL" />
                <NavItem href="/artistas" text="ARTISTAS" />
                <NavItem href="/blog" text="INFORMACIÓN" />
            </div>
        </div>
    );
};

const NavItem = ({ href, text }) => {
    return (
        <div className={style.navItem}>
            <Link href={href}>{text}</Link>
        </div>
    );
};

export default Nav;
