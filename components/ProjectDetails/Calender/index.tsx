import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './style.module.css';
// import CalendarComponent from "./calendar";
import Calendar, { CalendarDayHeader } from "./calendar.jsx";

// Importing Icons
import { AiOutlinePlus } from "react-icons/ai";
import { BsTriangle } from "react-icons/bs";
import { TbListDetails, TbSquareRotated } from "react-icons/tb";
import { SlLink } from "react-icons/sl";
// import DatePicker from 'react-date-picker/dist/entry.nostyle';

const currentDate = new Date();

interface CalenderProps {
    photoURL?: any
}

const Calender: React.FC<CalenderProps> = ({
    photoURL
}) => {
    const [yearAndMonth, setYearAndMonth] = useState([2021, 9]);

    return (
        <div className={styles.Contaienr}>
            {/* <div className={styles.Header}>
                <h1>Calender Header</h1>
            </div>
            <div className={styles.Body}>
                <h3>Calender Body</h3>
                <br />
                <br />
            </div> */}
               <Calendar
               
        yearAndMonth={yearAndMonth}
        onYearAndMonthChange={setYearAndMonth}
        // renderDay={(calendarDayObject: object) => (
        //   <div>
        //     <CalendarDayHeader calendarDayObject={calendarDayObject} />
        //   </div>
        // )}
        // renderDay={(calendarDayObject: CalendarDayObject) => (
        //     <div>
        //       <CalendarDayHeader calendarDayObject={calendarDayObject} />
        //     </div>
        //   )}
        renderDay={(calendarDayObject: any) => (
            <div>
              <CalendarDayHeader calendarDayObject={calendarDayObject} />
            </div>
          )}
      />
           {/* <CalendarComponent /> */}
        </div>
    )
}
export default Calender;