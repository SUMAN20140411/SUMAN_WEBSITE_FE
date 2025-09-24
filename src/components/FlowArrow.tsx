export function FlowArrow({ size = "md" }: { size?: "md" | "lg" }) {
  const dimensions = {
    md: { width: 24, height: 24 },
    lg: { width: 32, height: 32 }
  };

  const { width, height } = dimensions[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12h16m0 0l-6-6m6 6l-6 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}