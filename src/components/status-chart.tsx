"use client";

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { StatusStatGroup } from '@/types/report';
import { statusColors } from '@/data/status-statistics';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusChartProps {
  group: StatusStatGroup;
  selectedGroup: string;
}

export function StatusChart({ group, selectedGroup }: StatusChartProps) {
  // Only show this chart if it's the selected group
  if (group.title !== selectedGroup) {
    return null;
  }

  const data = {
    labels: group.items.map(item => item.status),
    datasets: [
      {
        data: group.items.map(item => item.amount),
        backgroundColor: group.items.map(item => statusColors[item.status] || '#ccc'),
        borderColor: group.items.map(item => statusColors[item.status] || '#ccc'),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'pie'>) {
            const label = context.label || '';
            // Type assertion for raw value which is a number
            const rawValue = context.raw as number;
            const value = rawValue.toLocaleString('ru-RU', { maximumFractionDigits: 2 });
            const percentage = ((rawValue / group.total.amount) * 100).toFixed(2);
            return `${label}: ${value} ₽ (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="h-[300px] w-[300px]">
      <Pie data={data} options={options} />
    </div>
  );
}
