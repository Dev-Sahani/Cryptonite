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
          <XAxis dataKey="interval" />
          <YAxis tickFormatter={DataFormater} domain={[]} />
          <Tooltip />
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

const DataFormater = (num: number) => {
  if (num > 1000000000) {
    return Math.floor(num / 1000000000).toString() + "B";
  } else if (num > 1000000) {
    return Math.floor(num / 1000000).toString() + "M";
  } else if (num > 1000) {
    return Math.floor(num / 1000).toString() + "K";
  } else {
    return num.toString();
  }
};
