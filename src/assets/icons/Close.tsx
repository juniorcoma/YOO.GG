interface CloseProps {
  size: number;
}

export default function Close({ size }: CloseProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="var(--color-gray-900)"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}