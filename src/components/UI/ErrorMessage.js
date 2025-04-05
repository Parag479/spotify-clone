export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error">
      <p>{message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}