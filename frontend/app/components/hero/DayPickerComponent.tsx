"use client";

import React, { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

const DayPickerComponent = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dayPickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Cerrar calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const shouldClose =
        dayPickerRef.current &&
        buttonRef.current &&
        !dayPickerRef.current.contains(target) &&
        !buttonRef.current.contains(target);

      if (shouldClose) setIsCalendarOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determinar el texto del botón según el estado de selección
  const getButtonText = () => {
    const { from, to } = dateRange || {};

    if (!from) return "Seleccionar fechas";
    if (!to) return `Entrada: ${format(from, "dd/MM/yyyy")} - Seleccione salida`;
    return `${format(from, "dd/MM")} - ${format(to, "dd/MM/yyyy")}`;
  };

  // Determinar el texto del footer
  const getFooterText = () => {
    const { from, to } = dateRange || {};

    if (from && to)
      return `${format(from, "PPP", { locale: es })} — ${format(to, "PPP", {
        locale: es,
      })}`;
    if (from) return "Seleccione la fecha de salida";
    return "Seleccione la fecha de entrada";
  };

  return (
    <div className="date-picker-container">
      <button
        ref={buttonRef}
        className="date-picker-button"
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        {getButtonText()}
      </button>

      {isCalendarOpen && (
        <div ref={dayPickerRef} className="calendar-popup">
          <DayPicker
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            locale={es}
            numberOfMonths={2}
            className="my-day-picker"
            modifiersClassNames={{
              selected: "my-selected",
              range_start: "my-range-start",
              range_end: "my-range-end",
              range_middle: "my-range-middle",
            }}
            footer={<p className="range-info">{getFooterText()}</p>}
          />
        </div>
      )}
    </div>
  );
};

export default DayPickerComponent;
