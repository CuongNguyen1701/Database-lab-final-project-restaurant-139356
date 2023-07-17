import { useState } from "react";
import { InputField, SelectField } from "./InputFields/InputField";
import GenericButton from "./Buttons/GenericButton";
import axios from "axios";
const backendUrl = import.meta.env.VITE_REACT_BACKEND_URL || ""; //from .env files
const Booking = () => {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [personCount, setPersonCount] = useState(0);
  const HandleBooking = async () => {
    if (
      guestName === "" ||
      email === "" ||
      phone === "" ||
      date === "" ||
      personCount === 0
    ) {
      alert("Please fill in all fields!");
      return;
    }
    //TODO: Handle booking
    const bookingData = {
      guestName: guestName,
      email: email,
      phone: phone,
      date: date,
      personCount: personCount,
    };
    const response = await axios.post(
      `${backendUrl}/api/create_booking`,
      bookingData
    );
    console.log(response);
  };
  return (
    <div className="bg-white text-primary flex flex-col items-center gap-5 p-10 w-screen h-fit pt-32">
      <div className="text-4xl font-body">Book A Table</div>
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
        <SelectField
          value={personCount}
          setValue={setPersonCount}
          placeholder={"how many persons?"}
          options={[
            { value: 1, text: "1 Person" },
            { value: 2, text: "2 Persons" },
            { value: 3, text: "3 Persons" },
            { value: 4, text: "4 Persons" },
            { value: 5, text: "5 Persons" },
            { value: 6, text: "6 Persons" },
            { value: 7, text: "7 Persons" },
          ]}
        />
        <GenericButton text="Book Now" onClick={HandleBooking} />
      </form>
    </div>
  );
};

export default Booking;
