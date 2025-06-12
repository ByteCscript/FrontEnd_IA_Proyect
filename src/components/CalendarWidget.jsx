// src/components/CalendarWidget.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';      // base de react-calendar
import '../styles/CalendarWidget.css';                  // tus overrides

export default function CalendarWidget() {
  const [value, setValue] = useState(new Date());
  return (
    <div style={{ width: '100%' }}>
      <Calendar
        onChange={setValue}
        value={value}
        // opcional: puedes forzar que use la clase .react-calendar
        // className="react-calendar"
      />
    </div>
  );
}
