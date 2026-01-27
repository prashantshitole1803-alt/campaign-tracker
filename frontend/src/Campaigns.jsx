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
  const [form, setForm] = useState({ name: "", status: "", platform: "", budget: 0 });

  const load = async () => {
    try {
      const res = await api.get("campaigns/");
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error loading campaigns:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    try {
      await api.post("campaigns/", form);
      setForm({ name: "", status: "", platform: "", budget: 0 });
      load();
    } catch (err) {
      console.error("Error creating campaign:", err);
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`campaigns/${id}/`);
      load();
    } catch (err) {
      console.error("Error deleting campaign:", err);
    }
  };

  return (
    <div>
      <h2>Campaigns</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Status"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      />
      <input
        placeholder="Platform"
        value={form.platform}
        onChange={(e) => setForm({ ...form, platform: e.target.value })}
      />
      <input
        placeholder="Budget"
        type="number"
        value={form.budget}
        onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
      />
      <button onClick={create}>Create</button>

      {campaigns.map((c) => (
        <div key={c.id}>
          <strong>{c.name}</strong> - {c.status} ({c.platform}) - ${c.budget}
          <button onClick={() => remove(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
