import React from "react";
import { useState } from "react";


interface FormData {
  address: string;
  amount: number
  powers: string[];
}


interface MyFormState {
  address: string;
  amount: number;
  powers: string[];
}
const POWERS =["Elemental manipulation", "Mind control", "Telekinesis","Immorality","Invisibility" ];

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<MyFormState>({
    address:"",
    amount:0,
    powers: POWERS
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        name="address"
        onChange={handleInputChange}
        placeholder="Enter the sender address"
        className="px-4 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 flex-grow"
      />
      <input
        type="number"
        name="amount"
        onChange={handleInputChange}
        placeholder="Enter the amount"
        className="px-4 py-2 border-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 flex-grow"
      />
      <div className="w-full p-2">
        <select
          id="interests"
          value={formData.powers}
          onChange={(event) =>
            setFormData({
              ...formData,
              powers: Array.from(
                event.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
        >
          {POWERS.map((pow, idx) => (
            <option value={idx} key={idx}>
              {pow}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default MyForm;

