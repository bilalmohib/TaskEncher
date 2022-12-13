import { useState } from 'react';

// Importing Icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineBars } from 'react-icons/ai';
// Importing Styles
import styles from './widget3.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function,
    email:String
}

const Widget1: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem,
    email
}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list, setList] = useState(
        [
            {
                title: "Alex",
                info: "",
                className: styles.icon1,
            },
            {
                title: "John",
                due_tasks: "",
                className: styles.icon2,
            },
            {
                title: "David",
                info: "",
                className: styles.icon3,
            }
        ]);

    return (
        <div className={styles.container}>
            <div className="d-flex">
                <h1>People</h1>
                {/* Secondary */}
                <div className="btn-group" style={{ fontSize: 12, height: 28, boxShadow: "none", marginTop: "-10px", marginLeft: 20 }}>
                    <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                        Frequent collaborators <IoMdArrowDropdown style={{ marginTop: -2 }} />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Frequent collaborators</a></li>
                        <li><a className="dropdown-item" href="#">Recent collaborators</a></li>
                        <li><a className="dropdown-item" href="#">Favorite collaborators</a></li>
                    </ul>
                </div>
            </div>
            <section className={`${styles.peopleContainer} ${((item == currentFullLengthItem) && (styles.fullWidthWidget))}`}>
                {list &&
                    list.map((item, index) => (
                        <div key={index} className={styles.individualPeople}>
                            {item.title}
                        </div>
                    ))}
            </section>
        </div>
    )
}
export default Widget1;