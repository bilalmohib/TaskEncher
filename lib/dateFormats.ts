import dayjs from "dayjs";

function formatDate(dateString: string | undefined) {
    // @ts-ignore
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const getDateTimeInDayjs = (date: any) => {
    return dayjs(date);
};

export { formatDate, getDateTimeInDayjs };