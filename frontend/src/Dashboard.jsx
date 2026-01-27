// import { useEffect, useState } from "react";
// import api from "./api";
// import { BarChart, Bar, XAxis, YAxis } from "recharts";

// export default function Dashboard() {
//   const [stats, setStats] = useState({});
//   const [quote, setQuote] = useState("");

//   useEffect(() => {
//     api.get("dashboard/").then(res => setStats(res.data));
//     api.get("quote/").then(res => setQuote(res.data.content));
//   }, []);

//   return (
//     <>
//       <h2>Dashboard</h2>
//       <BarChart width={300} height={200} data={stats.status_counts}>
//         <XAxis dataKey="status"/>
//         <YAxis/>
//         <Bar dataKey="count"/>
//       </BarChart>
//       <p>{quote}</p>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import api from "./api";

export default function Dashboard() {
  const [stats, setStats] = useState({ status_counts: [], platform_budget: [], total_campaigns: 0, total_budget: 0 });

  const loadStats = async () => {
    try {
      const res = await api.get("dashboard/");
      setStats(res.data);
    } catch (err) {
      console.error("Error loading dashboard stats:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Campaigns: {stats.total_campaigns}</p>
      <p>Total Budget: ${stats.total_budget}</p>

      <h3>Status Counts:</h3>
      <ul>
        {stats.status_counts.map((s) => (
          <li key={s.status}>
            {s.status}: {s.count}
          </li>
        ))}
      </ul>

      <h3>Platform Budgets:</h3>
      <ul>
        {stats.platform_budget.map((p) => (
          <li key={p.platform}>
            {p.platform}: ${p.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
