import { useState } from "react";
import { InputField, SelectField } from "./InputFields/InputField";
import GenericButton from "./Buttons/GenericButton";
const Booking = () => {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [personCount, setPersonCount] = useState(0);
  const HandleBooking = () => {
    //TODO: Handle booking
  };
  return (
    <div className="bg-white text-primary flex flex-col items-center gap-5 p-10 w-screen h-fit pt-32">
      <div className="text-4xl">Book A Table</div>
      <form className="flex flex-col items-center gap-5 text-white w-1/3">
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
        <SelectField value={personCount} setValue={setPersonCount} />
        <GenericButton text="Book Now" onClick={HandleBooking} />
      </form>
    </div>
  );
};

export default Booking;
