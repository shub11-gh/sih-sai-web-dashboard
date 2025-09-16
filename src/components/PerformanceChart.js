import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const PerformanceChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <XAxis 
        dataKey="date" 
        tick={{ fill: '#94a3b8' }}
        axisLine={{ stroke: '#475569' }}
      />
      <YAxis 
        tick={{ fill: '#94a3b8' }}
        axisLine={{ stroke: '#475569' }}
      />
      <Tooltip 
        contentStyle={{
          backgroundColor: '#1e293b',
          border: '1px solid #475569',
          borderRadius: '8px',
          color: '#f1f5f9'
        }}
      />
      <Line 
        type="monotone" 
        dataKey="score" 
        stroke="#8b5cf6" 
        strokeWidth={3}
        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
        activeDot={{ r: 6, fill: '#a855f7' }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default PerformanceChart;
