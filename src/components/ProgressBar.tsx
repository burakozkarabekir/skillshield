"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
        <span>
          Soru {current + 1} / {total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
        <div
          className="animate-progress h-full rounded-full bg-gradient-to-r from-adapt-600 to-adapt-400 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
