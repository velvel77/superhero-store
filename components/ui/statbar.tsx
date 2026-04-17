type statBarInfo = {
  label: string;
  value: number;
  color: string;
};

export default function StatBar({ label, value, color }: statBarInfo) {
  const id = `${label.toLowerCase()}-label`;
  return (
    <>
      <div className="flex justify-between">
        <span id={id} className="text-basic-300">
          {label}
        </span>
        <span>{value}</span>
      </div>

      <div className="w-full h-2 my-2 rounded-full border border-basic-700">
        <div
          aria-labelledby={id}
          role="progressbar"
          aria-valuemin={0}
          aria-valuenow={value}
          aria-valuemax={100}
          aria-valuetext={`${value} out of 100`}
          style={{ width: `${value}%` }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </>
  );
}
