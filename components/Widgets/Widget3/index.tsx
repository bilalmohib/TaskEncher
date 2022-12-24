import { useState } from 'react';
import Image from 'next/image';

// Importing Icons
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiOutlineBars } from 'react-icons/ai';
// Importing Styles
import styles from './widget3.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function,
    email: String
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
                photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                title: "John",
                due_tasks: "",
                className: styles.icon2,
                photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpUsFya9DL9bOADTtUIkMD01q4KlA1-8ESNIF05HPRug&s"
            },
            {
                title: "David",
                info: "",
                className: styles.icon3,
                photoURL: "https://media.istockphoto.com/id/526372013/photo/real-man-face.jpg?s=170667a&w=0&k=20&c=BAhiM5RaUP8i95PbHnWAjXHEJhtvmtGSOpbWT5j6J9g="
            },
            {
                title: "Fawad",
                info: "",
                className: styles.icon1,
                photoURL: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
                            <div className='text-center'>
                                <Image
                                    src={item.photoURL}
                                    alt={"Profile"}
                                    width={40}
                                    height={40}
                                    style={{ borderRadius: "50%" }}
                                />
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                        </div>
                    ))}
            </section>
        </div>
    )
}
export default Widget1;