// import { useEffect, useState } from "react";
// import api from "./api";

// export default function Campaigns() {
//   const [campaigns, setCampaigns] = useState([]);
//   const [form, setForm] = useState({});

//   const load = async () => {
//     const res = await api.get("campaigns/");
//     setCampaigns(res.data);
//   };

//   useEffect(() => { load(); }, []);

//   const create = async () => {
//     await api.post("campaigns/", form);
//     setForm({});
//     load();
//   };

//   const remove = async (id) => {
//     await api.delete(`campaigns/${id}/`);
//     load();
//   };

//   return (
//     <div>
//       <h2>Campaigns</h2>
//       <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
//       <button onClick={create}>Create</button>

//       {campaigns.map(c => (
//         <div key={c.id}>
//           {c.name}
//           <button onClick={()=>remove(c.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "./api";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await api.get("campaigns/");
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
      setError("Backend is waking up… please wait 30 seconds and refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    if (!form.name.trim()) return alert("Campaign name required");
    try {
      await api.post("campaigns/", form);
      setForm({ name: "" });
      load();
    } catch (err) {
      console.error(err);
      alert("Backend waking up. Try again in 20–30 seconds.");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`campaigns/${id}/`);
      load();
    } catch (err) {
      console.error(err);
      alert("Delete failed. Backend may be asleep.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Campaigns</h2>

      {loading && <p>Loading… (first load may take 30s)</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Campaign name"
        value={form.name}
        onChange={(e) => setForm({ name: e.target.value })}
      />
      <button onClick={create}>Create</button>

      <hr />

      {campaigns.map((c) => (
        <div key={c.id}>
          {c.name}
          <button onClick={() => remove(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
