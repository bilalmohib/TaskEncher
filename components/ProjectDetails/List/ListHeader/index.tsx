// Importing Icons
import { IoIosArrowDropdown } from 'react-icons/io';

import styles from './style.module.css';


interface IProps {
    ProjectName: string
}

const ListHeader: React.FC<IProps> = ({
    ProjectName
}) => {
    return (
        <div className={styles.container}>
            <div style={{
                marginLeft: 10,
                marginTop: 3
            }}>
                <div className="btn-group">
                    <button className={`btn btn-primary btn-sm ${styles.btn_add_task}`} type="button"> + Add task</button>
                    <button type="button" 
                 className={`btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split ${styles.btn_add_task}`} data-mdb-toggle="dropdown" aria-expanded="false">
                        <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Add section</a></li>
                        <li><a className="dropdown-item" href="#">Add milestone</a></li>
                    </ul>
                </div>
            </div>

            {/* Incomplete tasks */}
            <div className="btn-group" style={{ fontSize: 16, height: 28, boxShadow: "none", position: 'absolute', right:'50px' }}>
                <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                    <IoIosArrowDropdown style={{ marginTop: -2 }} /> Incomplete tasks
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Incomplete tasks</a></li>
                    <li><a className="dropdown-item" href="#">Complete tasks</a></li>
                    <li><a className="dropdown-item" href="#">All tasks</a></li>
                </ul>
            </div>

            {/* Filter */}
            {/* <div className="btn-group" style={{ fontSize: 16, height: 28, boxShadow: "none" }}>
                <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                    <IoIosArrowDropdown style={{ marginTop: -2 }} /> Filter
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Just my tasks</a></li>
                    <li><a className="dropdown-item" href="#">Due this week</a></li>
                    <li><a className="dropdown-item" href="#">Due next week</a></li>
                </ul>
            </div> */}

            {/* Sort */}
            <div className="btn-group" style={{ fontSize: 16, height: 28, boxShadow: "none", position: 'absolute', right:'5px' }}>
                <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                    <IoIosArrowDropdown style={{ marginTop: -2 }} /> Sort
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Start Date</a></li>
                    <li><a className="dropdown-item" href="#">Due Date</a></li>
                    <li><a className="dropdown-item" href="#">Assignee</a></li>
                    <li><a className="dropdown-item" href="#">Created by</a></li>
                    <li><a className="dropdown-item" href="#">Created on</a></li>
                    <li><a className="dropdown-item" href="#">Last modified on</a></li>
                    <li><a className="dropdown-item" href="#">Likes</a></li>
                    <li><a className="dropdown-item" href="#">Alphabetical</a></li>
                    <li><a className="dropdown-item" href="#">Priority</a></li>
                    <li><a className="dropdown-item" href="#">Status</a></li>
                    {/* Line between */}
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sort within sections</a></li>
                </ul>
            </div>
        </div>
    )
}
export default ListHeader;