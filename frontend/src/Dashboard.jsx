import { useEffect, useState } from "react";
import api from "./api";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [quote, setQuote] = useState("");

  useEffect(() => {
    api.get("dashboard/").then(res => setStats(res.data));
    api.get("quote/").then(res => setQuote(res.data.content));
  }, []);

  return (
    <>
      <h2>Dashboard</h2>
      <BarChart width={300} height={200} data={stats.status_counts}>
        <XAxis dataKey="status"/>
        <YAxis/>
        <Bar dataKey="count"/>
      </BarChart>
      <p>{quote}</p>
    </>
  );
}
