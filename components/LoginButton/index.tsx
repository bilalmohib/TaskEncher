import React from "react";
import { FcGoogle } from 'react-icons/fc';
import styles from '../../styles/ContainerCss/Login.module.css';

interface IProps {
    Icon: any,
    Text: string,
    onClick?: () => void,
}

const LoginButton: React.FC<IProps> = ({
    Icon,
    Text,
    onClick
}) => {
    return (
        <button onClick={onClick} className={`btn ${styles.btn_login}`}>
            <div className='d-flex'>
                <div style={{ marginTop: 3 }}>
                    {Icon}
                </div>
                <p className={styles.text_btn_login}>{Text}</p>
            </div>
        </button>
    )
}
export default LoginButton;