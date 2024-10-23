'use client';

import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { LOCALE } from "@config/locale";
import './datepicker.scss';

interface IDatePickerProps {
  startDate: Date | null;
  onChangeCallback: (date: Date | null) => void;
}

export default function DatePicker ({ startDate, onChangeCallback }: IDatePickerProps) {
  return (
    <ReactDatePicker
      locale={LOCALE}
      wrapperClassName="datepicker"
      calendarIconClassName="datepicker-calendarIcon"
      className="datepicker-input"
      clearButtonClassName="datepicker-clear"
      calendarClassName="datepicker-calendar"
      placeholderText="Select a date"
      selected={startDate}
      maxDate={new Date()}
      dateFormat="MMMM dd, yyyy"
      onChange={onChangeCallback}
      icon={
        <Image
          src={'/icons/calendar.svg'}
          alt='Calendar icon'
          width={14}
          height={14}
        />
      }
      toggleCalendarOnIconClick
      showIcon
      isClearable
    />
  )
}