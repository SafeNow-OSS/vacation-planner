'use client'

import React, { useState, useEffect, Suspense } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Holidays from 'date-holidays'
import './DatePickerWithHolidays.css'

interface DatePickerWithHolidaysProps {
  onRangeChange: (
    rangeInfo: {
      startDate: Date | null
      endDate: Date | null
    } | null,
  ) => void
  startDate?: Date | null // Optional start date prop
  endDate?: Date | null   // Optional end date prop
}

export const DatePickerWithHolidays: React.FC<DatePickerWithHolidaysProps> = ({
  onRangeChange,
  startDate = null, // Default to null if not provided
  endDate = null,   // Default to null if not provided
}) => {
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([startDate, endDate]) // Initialize with props
  const [holidayDates, setHolidayDates] = useState<Date[]>([])
  const [holidaysLoaded, setHolidaysLoaded] = useState(false) // Track if holidays are loaded

  useEffect(() => {
    const hd = new Holidays('DE', 'BY')
    const currentYear = new Date().getFullYear()
    const holidays = hd.getHolidays(currentYear)

    const holidayDatesArray = holidays.map((holiday) => new Date(holiday.date))
    setHolidayDates(holidayDatesArray)
    setHolidaysLoaded(true) // Mark holidays as loaded
  }, [])

  useEffect(() => {
    if (selectedRange[0] && selectedRange[1] && holidaysLoaded) {
      onRangeChange({
        startDate: selectedRange[0],
        endDate: selectedRange[1],
      })
    } else {
      onRangeChange(null)
    }
  }, [selectedRange, holidaysLoaded]) // Trigger only when selectedRange or holidaysLoaded changes

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
    let count = 0
    let currentDate = new Date(start)
    while (currentDate <= end) {
      if (isWorkingDay(currentDate)) count++
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return count
  }

  const workingDays =
    selectedRange[0] && selectedRange[1] && holidaysLoaded
      ? calculateWorkingDays(selectedRange[0], selectedRange[1]) // Use real calculation
      : 0

  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    setSelectedRange(dates)
  }

  return (
    <Suspense fallback={<div>Loading Date Picker...</div>}>
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
        <div className="selected-range-display">
          {selectedRange[0] && <p>Start Date: {selectedRange[0].toLocaleDateString()}</p>}
          {selectedRange[1] && <p>End Date: {selectedRange[1].toLocaleDateString()}</p>}
          {selectedRange[0] && selectedRange[1] && holidaysLoaded && workingDays > 0 && (
            <p className="working-days-display">Working Days: {workingDays}</p>
          )}
        </div>
      </div>
    </Suspense>
  )
}

export default DatePickerWithHolidays
