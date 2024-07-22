"use client";
import { useQuerySetClientSide } from "@/hooks/useQuerySetClientSide";
import { colors, defaultCoin } from "@/utils/constants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/utils/typeConversion";

type Props<T> = {
  data: T;
  lineKeys: Array<string>;
};

export default function LineCharts<T extends Array<Object>>({
  data,
  lineKeys,
}: Props<T>) {
  const [coin, setCoin] = useQuerySetClientSide("coin", defaultCoin);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="0" />
          <YAxis
            tickFormatter={(value) => formatNumber(value, 1)}
            domain={[]}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              formatNumber(value, 1),
              name,
            ]}
          />
          {lineKeys.map((key, index) => (
            <Line
              name={coin}
              dataKey={key}
              key={key}
              stroke={colors[index % colors.length]}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
