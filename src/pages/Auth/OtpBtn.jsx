export function OtpInput({ length = 5, value, onChange }) {
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    onChange(next.join(""));
    if (val && i < length - 1) {
      document.getElementById(`otp-${i + 1}`)?.focus();
    }
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      document.getElementById(`otp-${i - 1}`)?.focus();
    }
  };

  return (
    <div className="flex gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          className="w-11 h-11 rounded-lg border border-gray-200 text-center text-lg font-semibold text-gray-700 bg-gray-50 outline-none focus:border-[#DB0000] focus:bg-white focus:ring-2 focus:ring-red-10 transition-all"
        />
      ))}
    </div>
  );
}