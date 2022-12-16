import { AiOutlineUnorderedList } from "react-icons/ai";
import styles from './style.module.css';

interface ProjectIconProps {
    h: any,
    w: any,
    IconSize: any,
    Color: any
}

const ProjectIcon: React.FC<ProjectIconProps> = ({
    h,
    w,
    IconSize,
    Color
}) => {

    return (
        <div className={styles.container} style={{ width: w, height: h, color: Color,paddingTop:5,paddingLeft:5 }}>
            <AiOutlineUnorderedList size={IconSize} />
        </div>
    )
}
export default ProjectIcon;