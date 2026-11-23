"use client";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  daily: { day: string; credits: number }[];
  kinds: { name: string; runs: number }[];
  verdicts: { name: string; count: number }[];
}

export function AnalyticsCharts({ daily, kinds, verdicts }: Props) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="card p-5 lg:col-span-2">
        <h2 className="mb-4 font-semibold">Credits per day</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={daily}>
              <CartesianGrid stroke="#e4e1da" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} interval={4} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={30} />
              <Tooltip />
              <Line isAnimationActive={false} type="monotone" dataKey="credits" stroke="#6c47ff" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card p-5">
        <h2 className="mb-4 font-semibold">Runs by type</h2>
        <div className="h-52">
          <ResponsiveContainer>
            <BarChart data={kinds}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} width={30} tick={{ fontSize: 11 }} /><Tooltip />
              <Bar isAnimationActive={false} dataKey="runs" fill="#6c47ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="card p-5">
        <h2 className="mb-4 font-semibold">Guardrail verdicts</h2>
        <div className="h-52">
          <ResponsiveContainer>
            <BarChart data={verdicts}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} /><YAxis allowDecimals={false} width={30} tick={{ fontSize: 11 }} /><Tooltip />
              <Bar isAnimationActive={false} dataKey="count" fill="#2f9e6b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
