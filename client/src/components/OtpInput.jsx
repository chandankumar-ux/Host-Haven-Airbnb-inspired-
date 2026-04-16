import { useRef } from "react";

const OtpInput = ({ register, setValue, error }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // sirf number allow
    if (!/^[0-9]?$/.test(value)) return;

    setValue(`otp.${index}`, value);

    // next box pe focus
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <>
      <div className="flex gap-2 justify-center">
        {[...Array(6)].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-12 h-12 text-center border-2 border-gray-300 rounded-xl text-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition bg-white shadow-sm"
            {...register(`otp.${index}`, {
              required: true,
            })}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">
          OTP is required
        </p>
      )}
    </>
  );
};

export default OtpInput;
