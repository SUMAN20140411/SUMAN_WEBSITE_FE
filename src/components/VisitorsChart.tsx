import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

interface VisitorData {
  yearMonth: number;
  visitors: number;
}

interface Props {
  data: VisitorData[];
}

const formatMonth = (yearMonth: number) => {
  const year = Math.floor(yearMonth / 100);
  const month = yearMonth % 100;
  return `${year}.${month.toString().padStart(2, "0")}`;
};

// 커스텀 툴팁 컴포넌트
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded shadow text-sm text-black">
        <p className="font-semibold">{label}</p>
        <p>{`방문자 수: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default function MonthlyVisitorsChart({ data }: Props) {
  const [loading, setLoading] = useState(true);
  const [formattedData, setFormattedData] = useState<VisitorData[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const transformed = data.map((item) => ({
        ...item,
        label: formatMonth(item.yearMonth),
      }));
      setFormattedData(transformed);
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-white"></div>
        불러오는중..
      </div>
    );
  }
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fill: "#ffffff" }} />{" "}
          {/* X축 글씨색 */}
          <YAxis tick={{ fill: "#ffffff" }} /> {/* Y축 글씨색 */}
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
