import { CgMenu } from 'react-icons/cg';
import styles from './style.module.css';
import Image from 'next/image';

interface IProps {
    setIsOpen: any,
    isOpen: Boolean
}

const Navbar: React.FC<IProps> = ({
    setIsOpen,
    isOpen
}) => {
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.nav_bar}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    &nbsp;
                    <span className={styles.navbarHamburger} onClick={() => setIsOpen(!isOpen)}> <CgMenu size={25} /> </span>
                    &nbsp; &nbsp;
                    <Image src="/navlogo.svg" alt="Asana" width={100} height={18} />
                </a>
                <div>
                    <div className={`${styles.navItems} navbar-nav`}>
                        <a className="nav-link active" aria-current="page" href="#">5 days left in trial</a>
                        <a className="nav-link" href="#">
                            <button className="btn btn-warning btn-sm">Add billing info</button>
                        </a>

                        {/* Avatar */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" className="rounded-circle" height={22} alt="Portrait of a Woman" loading="lazy" />
                            </a>
                            <ul className={`dropdown-menu ${styles.dropdown_nav}`} aria-labelledby="navbarDropdownMenuLink">
                                <li>
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </li>
                        {/* Avatar */}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar