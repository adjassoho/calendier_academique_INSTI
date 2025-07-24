import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import CalendarAdmin from '../views/wadmin/CalendarAdmin';

// Montage du composant CalendarAdmin
if (document.getElementById('calendar-admin')) {
    const root = createRoot(document.getElementById('calendar-admin'));
    root.render(<CalendarAdmin />);
}