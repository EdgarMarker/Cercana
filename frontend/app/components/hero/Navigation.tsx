"use client";

import React, { useState, useRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import '@/app/styles/test.css';

const Navigation = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dayPickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dayPickerRef.current && 
        !dayPickerRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const buttonText = () => {
    if (!dateRange?.from) {
      return 'Seleccionar fechas';
    }
    
    if (dateRange.from && !dateRange.to) {
      return `Entrada: ${format(dateRange.from, 'dd/MM/yyyy')} - Seleccione salida`;
    }
    
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'dd/MM')} - ${format(dateRange.to, 'dd/MM/yyyy')}`;
    }
  };

  return (
    <div className="date-picker-container">
      <button 
        ref={buttonRef}
        className="date-picker-button" 
        onClick={toggleCalendar}
      >
        {buttonText()}
      </button>
      
      {isCalendarOpen && (
        <div 
          ref={dayPickerRef} 
          className="calendar-popup"
        >
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            locale={es}
            numberOfMonths={2}
            className="my-day-picker"
            modifiersClassNames={{
              selected: 'my-selected',
              range_start: 'my-range-start',
              range_end: 'my-range-end',
              range_middle: 'my-range-middle'
            }}
            footer={
              dateRange?.from && dateRange?.to ? (
                <p className="range-info">
                  {`${format(dateRange.from, 'PPP', { locale: es })} — ${format(
                    dateRange.to,
                    'PPP',
                    { locale: es }
                  )}`}
                </p>
              ) : dateRange?.from ? (
                <p className="range-info">Seleccione la fecha de salida</p>
              ) : (
                <p className="range-info">Seleccione la fecha de entrada</p>
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default Navigation;
