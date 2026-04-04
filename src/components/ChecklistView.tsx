'use client';

import { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { BrandConfig } from '@/types';

interface ChecklistEntry {
  id: number;
  title: string;
  description: string;
  order_num: number;
  completed: boolean;
  completed_at: string | null;
}

export default function ChecklistView({ brand }: { brand: BrandConfig }) {
  const [items, setItems] = useState<ChecklistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChecklist();
  }, []);

  const fetchChecklist = async () => {
    try {
      const res = await fetch('/api/checklist');
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = async (itemId: number, completed: boolean) => {
    const res = await fetch('/api/checklist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checklist_item_id: itemId, completed: !completed }),
    });

    if (res.ok) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? {
                ...item,
                completed: !completed,
                completed_at: !completed ? new Date().toISOString() : null,
              }
            : item
        )
      );
    }
  };

  if (loading) {
    return <div className="text-gray-500">Loading checklist...</div>;
  }

  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div className="space-y-6">
      <ProgressBar completed={completedCount} total={items.length} color={brand.primaryColor} />

      <div className="space-y-3">
        {items
          .sort((a, b) => a.order_num - b.order_num)
          .map((item) => (
            <div
              key={item.id}
              className={`flex items-start space-x-4 p-4 rounded-lg border transition ${
                item.completed
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id, item.completed)}
                className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition flex-shrink-0 ${
                  item.completed ? 'border-green-500 bg-green-500' : 'border-gray-300'
                }`}
              >
                {item.completed && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <div>
                <p
                  className={`font-medium ${
                    item.completed ? 'text-green-800 line-through' : 'text-gray-900'
                  }`}
                >
                  {item.title}
                </p>
                <p className={`text-sm ${item.completed ? 'text-green-600' : 'text-gray-500'}`}>
                  {item.description}
                </p>
                {item.completed && item.completed_at && (
                  <p className="text-xs text-green-500 mt-1">
                    Completed {new Date(item.completed_at).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
