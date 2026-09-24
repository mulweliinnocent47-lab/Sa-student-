export default function Input({ id, type = "text", pro, value, logic, must }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{pro}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={value}
        onChange={logic}
        required={must}
        className="auth-input"
      />
    </div>
  );
}
