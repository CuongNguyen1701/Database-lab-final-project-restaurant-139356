import { useState } from "react";
const InputField = ({
  value,
  setValue,
  placeholder,
  type,
  isOption = false,
}) => {
  const styles = "border-2 border-gray-300 rounded-md py-3 px-5 w-full text-xl";
  if (isOption) {
    return (
      <select
        value={value}
        placeholder="how many persons?"
        className={styles}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="1">1 Person</option>
        <option value="2">2 Persons</option>
        <option value="3">3 Persons</option>
        <option value="4">4 Persons</option>
        <option value="5">5 Persons</option>
      </select>
    );
  }
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className={styles}
    />
  );
};

const Booking = () => {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [personCount, setPersonCount] = useState(0);

  return (
    <div className="bg-white text-primary flex flex-col items-center gap-5 p-10">
      <div className="text-4xl">Book A Table</div>
      <form className="flex flex-col gap-5 text-white w-1/3">
        <InputField
          value={guestName}
          setValue={setGuestName}
          placeholder="guest name"
          type="text"
        />
        <InputField
          value={email}
          setValue={setEmail}
          placeholder="email"
          type="email"
        />
        <InputField
          value={phone}
          setValue={setPhone}
          placeholder="phone"
          type="tel"
        />
        <InputField value={date} setValue={setDate} type="date" />
        <InputField value={personCount} setValue={setPersonCount} isOption />
      </form>
    </div>
  );
};

export default Booking;
