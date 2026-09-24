export default function Button({ info, type = "button", onClick, disabled }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="auth-button">
      {info}
    </button>
  );
}
