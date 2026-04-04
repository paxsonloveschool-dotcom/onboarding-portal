'use client';

export default function ProgressBar({
  completed,
  total,
  color = '#2d5016',
}: {
  completed: number;
  total: number;
  color?: string;
}) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">
          {completed} of {total} completed
        </span>
        <span className="font-semibold" style={{ color }}>
          {pct}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
