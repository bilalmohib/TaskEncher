import React from 'react'
import styles from './style.module.css';

interface IProps {
    setIsOpen: any,
    isOpen: Boolean
}

const Sidebar: React.FC<IProps> = ({
    setIsOpen,
    isOpen
}) => {
    return (
        <section className={`${styles.sidebar} ${(isOpen)?(""):(styles.hideSidebar)}`}>
            <h1>Sidebar</h1>

        </section>
    )
}
export default Sidebar;