'use client'

import React, { Suspense } from 'react'
import { useField } from '@payloadcms/ui'
import { DatePickerWithHolidays } from './DatePickerWithHolidays'

const CustomVacationRequestForm = () => {
  const { value: startDateValue, setValue: setStartDateValue } = useField({ path: 'startDate' })
  const { value: endDateValue, setValue: setEndDateValue } = useField({ path: 'endDate' })

  const handleRangeChange = (rangeInfo: { startDate: Date | null; endDate: Date | null } | null) => {
    if (rangeInfo) {
      setStartDateValue(rangeInfo.startDate)
      setEndDateValue(rangeInfo.endDate)
    } else {
      setStartDateValue(null)
      setEndDateValue(null)
    }
  }

  return (
    <div>
      <Suspense fallback={<div>Loading Vacation Request Form...</div>}>
        <DatePickerWithHolidays
          onRangeChange={handleRangeChange}
          startDate={startDateValue ? new Date(Date.parse(startDateValue as string)) : null} // Handle null values
          endDate={endDateValue ? new Date(Date.parse(endDateValue as string)) : null}     // Handle null values
        />
      </Suspense>
    </div>
  )
}

export default CustomVacationRequestForm

