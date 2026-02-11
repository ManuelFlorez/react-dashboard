import { useState } from 'react'
import Scheduler from 'react-mui-scheduler'

export default function Schedule() {
  const [state] = useState({
    options: {
      transictionMode: 'zoom', // 'zoom' | 'fade'
      startWeekOn: 'mon', // 'sun' | 'mon'
      defaultMode: 'month', // 'day' | 'week' | 'timeline' | 'month'
      minWidth: '540',
      maxWidth: '540',
      minHeight: '540',
      maxHeight: '540',
    },
    alertProps: {
      open: true,
      color: 'info', // 'error' | 'warning' | 'info' | 'success'
      severity: 'info', // 'error' | 'warning' | 'info' | 'success'
      message: 'Evento programado para hoy', // String
      showActionButton: true,
      showNotification: true,
      delay: 1500
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true
    }
  })

  const events = [
    {
      id: 'event-1',
      label: 'Medical consultation',
      user: 'Dr Shaun Murphy',
      color: '#f28f6a',
      startHour: '04:00 AM',
      endHour: '05:00 AM',
      date: '2026-02-08',
      createdAt: new Date('2026-02-08T00:00:00-05:00'),
      createdBy: 'Kristina Mayer'
    }
  ]

  const handleCellClick = (event, row, day) => {
    // Do something when a cell is clicked
  }

  const handleEventClick = (event, item) => {
    // Do something when an event is clicked
  }

  const handleEventChange = (item) => {
    // Do something when an event is changed (drag and drop or resize)
  }

  const handleAlertCloseButtonClick = (item) => {
    // Do something when the alert close button is clicked
  }

  return (
    <Scheduler
      locale="es"
      events={events}
      legasyStyle={false}
      options={state?.options}
      alertProps={state?.alertProps}
      toolbarProps={state?.toolbarProps}
      onEveentsChange={handleEventChange}
      onCellClick={handleCellClick}
      onTaskClick={handleEventClick}
      onAlertCloseButtonClick={handleAlertCloseButtonClick}
    />
  )
}