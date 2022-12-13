import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './widget2.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function,
    email: String
}

const Widget2: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem,
    email
}) => {
    const [currentPriority, setCurrentPriority] = useState<Number>(1);

    return (
        <div className={styles.container}>
            <header className={styles.style_header}>
                <div className={styles.left_Container_Header}>
                    <Image
                        src="/user_alt.png"
                        width={50}
                        className={styles.user_image}
                        height={50}
                        role="button"
                        alt="User Alt"
                        title='User Alt'
                    />
                </div>
                <div className={styles.right_Container_Header}>
                    <h4>My Priorities</h4>
                    <div>
                        <ul className={styles.bottomRightList}>
                            <li className={(currentPriority === 1) ? (styles.selected_li) : ("")} onClick={() => setCurrentPriority(1)}>Upcoming</li>
                            <li className={(currentPriority === 2) ? (styles.selected_li) : ("")} onClick={() => setCurrentPriority(2)}>Overdue (1)</li>
                            <li className={(currentPriority === 3) ? (styles.selected_li) : ("")} onClick={() => setCurrentPriority(3)}>Completed</li>
                        </ul>
                    </div>
                </div>
            </header>
            <div>
                <div className={styles.style_body}>
                    
                </div>
            </div>
        </div>
    )
}
export default Widget2;