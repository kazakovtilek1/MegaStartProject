import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  startDate,
  setStartDate,
}) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      minDate={new Date()}
      dateFormat="dd.MM.yyyy"
      placeholderText="Выберите дату"
      showPopperArrow={false}
      calendarClassName="!w-71 !h-77 !p-4 !ml-37 !border-none"
      dayClassName={() => "!text-center !w-7.5 !h-7.5"}
      wrapperClassName="w-full"
      popperPlacement="bottom"
      inline
      formatWeekDay={(nameOfDay) => nameOfDay.slice(0, 3).toUpperCase()}
      renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={decreaseMonth}
            className="text-xl px-2 cursor-pointer"
          >
            ‹
          </button>
          <span className="text-sm font-normal tracking-wide">
            {date.toLocaleString("en-US", { month: "long" })}
          </span>
          <button
            onClick={increaseMonth}
            className="text-xl px-2 cursor-pointer"
          >
            ›
          </button>
        </div>
      )}
    />
  );
};

export default DatePickerComponent;
