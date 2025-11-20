import React, { useState, useEffect } from 'react';
import './date-slots.css';

// MODIFIED: Now accepts 'slotsData' as a prop
const DateSlots = ({ onDateSelect, slotsData }) => {
  // Handle case where no data is found
  const [openMonth, setOpenMonth] = useState(null); 
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Set the first month to open automatically when data loads
  useEffect(() => {
    if (slotsData && slotsData.length > 0) {
      setOpenMonth(slotsData[0].month);
    }
  }, [slotsData]);

  const handleMonthClick = (month) => {
    setOpenMonth(openMonth === month ? null : month);
  };

  const handleSlotClick = (slot) => {
    if (slot.status === 'Sold Out') return; 
    setSelectedSlot(slot.id); 
    onDateSelect(slot.date); 
  };

  if (!slotsData || slotsData.length === 0) {
    return <div className="p-3 text-muted">No dates available for this tour yet.</div>;
  }

  return (
    <div className="date-slots-container">
      {slotsData.map((monthData, index) => (
        <div className="month-group" key={index}>
          <button
            type="button"
            className="month-header"
            onClick={() => handleMonthClick(monthData.month)}
          >
            <span>{monthData.month}</span>
            <span className={`chevron ${openMonth === monthData.month ? 'open' : ''}`}>
              ▼
            </span>
          </button>
          
          <div className={`slots-list ${openMonth === monthData.month ? 'open' : ''}`}>
            {monthData.slots.map((slot) => (
              <div
                className={`
                  slot-item 
                  ${slot.status === 'Sold Out' ? 'sold-out' : ''}
                  ${selectedSlot === slot.id ? 'selected' : ''}
                `}
                key={slot.id}
                onClick={() => handleSlotClick(slot)}
              >
                <div className="slot-date">{slot.date}</div>
                {slot.tag && (
                  <div className="slot-tag">{slot.tag}</div>
                )}
                <div className={`slot-status ${slot.status.replace(' ', '-').toLowerCase()}`}>
                  {slot.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateSlots;