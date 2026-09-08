export function NorthEastArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`ne-arrow-icon ${className}`.trim()}
      viewBox="0 0 20 20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 16 16 4M7 4h9v9" />
    </svg>
  );
}
