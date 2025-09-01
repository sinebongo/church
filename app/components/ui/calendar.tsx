import * as React from "react";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ value, onChange }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
  };

  return (
    <div className="calendar-component">
      <input
        type="date"
        value={selectedDate ? selectedDate.toISOString().substr(0, 10) : ''}
        onChange={handleChange}
        className="border rounded px-2 py-1"
      />
    </div>
  );
};
