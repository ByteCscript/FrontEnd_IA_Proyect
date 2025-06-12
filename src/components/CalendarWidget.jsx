// src/components/CalendarWidget.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarWidget() {
  const [value, setValue] = useState(new Date());
  return (
    <div style={{ width: '100%' }}>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}

