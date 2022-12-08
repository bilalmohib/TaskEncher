import { useState } from 'react';

// Importing Icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineBars } from 'react-icons/ai';
// Importing Styles
import styles from './widget1.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function
}

const Widget1: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem
}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list, setList] = useState(
        [
            {
                title: "Create Project",
                info: "",
                className: styles.icon1,
            },
            {
                title: "Software Development",
                due_tasks: "",
                className: styles.icon2,
            },
            {
                title: "FYP",
                info: "2 tasks due soon",
                className: styles.icon3,
            }
        ]);

    return (
        <div className={styles.container}>
            <div className="d-flex">
                <h1>Projects</h1>
                {/* Secondary */}
                <div className="btn-group" style={{ fontSize: 12, height: 28, boxShadow: "none", marginTop: "-10px", marginLeft: 20 }}>
                    <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                        Recents <IoMdArrowDropdown style={{ marginTop: -2 }} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Recents</a></li>
                        <li><a className="dropdown-item" href="#">Favorites</a></li>
                    </ul>
                </div>
            </div>
            <section className={`${styles.projectsContainer} ${((item == currentFullLengthItem) && (styles.fullWidthWidget))}`}>
                {list &&
                    list.map((item, index) => (
                        <div key={index} className={styles.individualProject}>
                            <div className={`${styles.icon_style} ${item.className}`}>
                                <AiOutlineBars style={{ fontSize: 30, color: "white" }} />
                            </div>
                            <div className={styles.containerRightProject}>
                                <h4 className={styles.projectTitle}>{item.title}</h4>
                                <p className={styles.infoText}>{item.info}</p>
                            </div>
                        </div>
                    ))}
            </section>
        </div>
    )
}
export default Widget1;