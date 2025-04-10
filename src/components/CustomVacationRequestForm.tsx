'use client'

import { useAllFormFields, useField } from '@payloadcms/ui'

const CustomVacationRequestForm = () => {
  const { value: startDateValue, setValue: setStartDateValue } = useField({ path: 'startDate' })
  const { value: endDateValue, setValue: setendDateValue } = useField({ path: 'endDate' })

  return (
    <div>
      <pre>{JSON.stringify({ startDateValue, endDateValue }, null, 2)}</pre>
      <button
        onClick={(e) => {
          e.preventDefault()
          setStartDateValue(new Date())
          setendDateValue(new Date())
        }}
      >
        SET TO NOW
      </button>
    </div>
  )
}

export default CustomVacationRequestForm
