import PropTypes from "prop-types";
import classNames from "classnames";
import styles from './style.module.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  daysOfWeek,
  createDaysForCurrentMonth,
  createDaysForNextMonth,
  createDaysForPreviousMonth,
  isWeekendDay,
  getMonthDropdownOptions,
  getYearDropdownOptions
} from "./helpers";

Calendar.propTypes = {
  className: PropTypes.string,
  yearAndMonth: PropTypes.arrayOf(PropTypes.number).isRequired, // e.g. [2021, 6] for June 2021
  onYearAndMonthChange: PropTypes.func.isRequired,
  renderDay: PropTypes.func
};
export default function Calendar({
  className = "",
  yearAndMonth = [2021, 6],
  onYearAndMonthChange,
  renderDay
}) {
  const [year, month] = yearAndMonth;

  let currentMonthDays = createDaysForCurrentMonth(year, month);
  let previousMonthDays = createDaysForPreviousMonth(
    year,
    month,
    currentMonthDays
  );
  let nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
  let calendarGridDayObjects = [
    ...previousMonthDays,
    ...currentMonthDays,
    ...nextMonthDays
  ];

  const handleMonthNavBackButtonClick = () => {
    let nextYear = year;
    let nextMonth = month - 1;
    if (nextMonth === 0) {
      nextMonth = 12;
      nextYear = year - 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthNavForwardButtonClick = () => {
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth === 13) {
      nextMonth = 1;
      nextYear = year + 1;
    }
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleMonthSelect = (evt) => {
    let nextYear = year;
    let nextMonth = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  const handleYearSelect = (evt) => {
    let nextMonth = month;
    let nextYear = parseInt(evt.target.value, 10);
    onYearAndMonthChange([nextYear, nextMonth]);
  };

  return (
    <div className={styles.calendarRoot}>
      <div className={styles.navigationheader}>
        <div className={styles.monthnavarrowbuttons}>
            <span className={styles.todspan}>
              Today
            </span>
          <button onClick={handleMonthNavBackButtonClick} className={styles.arrowbuttons}> <ArrowBackIosNewIcon style={{fontSize: 17.5}} /> </button>
          <button onClick={handleMonthNavForwardButtonClick} className={styles.arrowbuttons}><ArrowForwardIosIcon style={{fontSize: 17.5}} /></button>
        </div>
        <select
          className={styles.monthselect}
          value={month}
        style={{border:'none'}}
          onChange={handleMonthSelect}
        >
          {
          getMonthDropdownOptions().map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
        <select
        style={{border:'none'}}
          className={styles.yearselect}
          value={year}
          onChange={handleYearSelect}
        >
          {getYearDropdownOptions(year).map(({ label, value }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.daysofweek}>
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={classNames(styles.dayofweekheadercell, {
              "weekend-day": [6, 0].includes(index)
            })}
          >
            {day}
          </div>
        ))}
      </div>
      <div className={styles.daysgrid}>
        {calendarGridDayObjects.map((day) => (
          <div
            key={day.dateString}
            className={classNames(styles.daygriditemcontainer, {
              "weekend-day": isWeekendDay(day.dateString),
              "current-month": day.isCurrentMonth
            })}
          >
            <div className={styles.daycontentwrapper}>{renderDay(day)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

CalendarDayHeader.propTypes = {
  calendarDayObject: PropTypes.object.isRequired
};
export function CalendarDayHeader({ calendarDayObject }) {
  return (
    <div className={styles.daygriditemheader}>{calendarDayObject.dayOfMonth}</div>
  );
}
