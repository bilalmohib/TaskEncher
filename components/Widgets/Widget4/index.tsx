import styles from './widget4.module.css';

interface IProps {
    item: Number,
    currentFullLengthItem: Number,
    setCurrentFullLengthItem: Function
}

const Widget4: React.FC<IProps> = ({
    item,
    currentFullLengthItem,
    setCurrentFullLengthItem
}) => {
    return(
        <div className={styles.container}>
            <h1>Tasks I have Assigned</h1>
        </div>
    )
}
export default Widget4;