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
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null);

  // Load campaigns from backend
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("campaigns/");
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Create new campaign
  const create = async () => {
    if (!form.name) return alert("Name is required");
    try {
      await api.post("campaigns/", form);
      setForm({ name: "" });
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign");
    }
  };

  // Delete campaign
  const remove = async (id) => {
    try {
      await api.delete(`campaigns/${id}/`);
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete campaign");
    }
  };

  return (
    <div>
      <h2>Campaigns</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <button onClick={create}>Create</button>

      {loading ? (
        <p>Loading campaigns...</p>
      ) : (
        campaigns.map(c => (
          <div key={c.id}>
            {c.name} <button onClick={() => remove(c.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
