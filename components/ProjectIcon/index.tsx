import { AiOutlineUnorderedList } from "react-icons/ai";
import styles from './style.module.css';

interface ProjectIconProps {
    h: any,
    w: any,
    IconSize: any,
    Color: any,
    BGC: any,
}

const ProjectIcon: React.FC<ProjectIconProps> = ({
    h,
    w,
    IconSize,
    Color,
    BGC
}) => {

    return (
        <div className={styles.container}
            style={{
                width: w,
                height: h,
                color: Color,
                paddingTop: 5,
                paddingLeft: 5,
                backgroundColor: BGC,
                border: `1px solid ${BGC}`,
            }}
        >
            <AiOutlineUnorderedList size={IconSize} />
        </div>
    )
}
export default ProjectIcon;