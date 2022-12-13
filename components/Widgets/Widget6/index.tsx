import styles from './widget6.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function,
    email: String
}

const Widget6: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem,
    email
}) => {
    return(
        <div className={styles.container}>
            <h1>Widget 6</h1>
        </div>
    )
}
export default Widget6;