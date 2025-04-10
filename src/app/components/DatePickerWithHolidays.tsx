'use client'

import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Holidays from 'date-holidays'
import './DatePickerWithHolidays.css'

interface DatePickerWithHolidaysProps {
  onRangeChange: (
    rangeInfo: {
      startDate: Date | null
      endDate: Date | null
      workingDays: number
    } | null,
  ) => void
}

export const DatePickerWithHolidays: React.FC<DatePickerWithHolidaysProps> = ({
  onRangeChange,
}) => {
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([null, null])
  const [holidayDates, setHolidayDates] = useState<Date[]>([])

  useEffect(() => {
    const hd = new Holidays('DE', 'BY')
    const currentYear = new Date().getFullYear()
    const holidays = hd.getHolidays(currentYear)

    const holidayDatesArray = holidays.map((holiday) => new Date(holiday.date))
    setHolidayDates(holidayDatesArray)
  }, [])

  const isHoliday = (date: Date) => {
    return holidayDates.some(
      (holidayDate) =>
        holidayDate.getFullYear() === date.getFullYear() &&
        holidayDate.getMonth() === date.getMonth() &&
        holidayDate.getDate() === date.getDate(),
    )
  }

  const isWorkingDay = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6 && !isHoliday(date)
  }

  const calculateWorkingDays = (start: Date, end: Date) => {
    let workingDays = 0
    const currentDate = new Date(start)

    while (currentDate <= end) {
      if (isWorkingDay(currentDate)) {
        workingDays++
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return workingDays
  }

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    setSelectedRange(dates)

    if (dates[0] && dates[1]) {
      const startDate = dates[0]
      const endDate = dates[1]
      const workingDays = calculateWorkingDays(startDate, endDate)

      onRangeChange({
        startDate,
        endDate,
        workingDays,
      })
    } else {
      onRangeChange(null)
    }
  }

  return (
    <div className="date-picker-container">
      <DatePicker
        selected={selectedRange[0]}
        onChange={handleRangeChange}
        startDate={selectedRange[0]}
        endDate={selectedRange[1]}
        selectsRange
        dayClassName={(date) => {
          if (isHoliday(date)) return 'holiday'
          if (!isWorkingDay(date)) return 'non-working-day'
          return ''
        }}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date range"
        calendarStartDay={1}
      />
    </div>
  )
}

export default DatePickerWithHolidays
