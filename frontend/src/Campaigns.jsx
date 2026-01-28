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
  const [error, setError] = useState(null);

  // Load campaigns (safe for Render cold start)
  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("campaigns/", {
        timeout: 60000, // allow backend cold start
      });

      setCampaigns(res.data);
    } catch (err) {
      console.error(err);

      if (!err.response) {
        setError("Backend is starting… please wait 30 seconds and refresh.");
      } else {
        setError("Failed to load campaigns.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Create campaign (non-blocking UI)
  const create = async () => {
    if (!form.name.trim()) return;

    try {
      setError(null);

      await api.post("campaigns/", form, {
        timeout: 60000,
      });

      setForm({ name: "" });
      load();
    } catch (err) {
      console.error(err);
      setError("Backend waking up. Try again in 30 seconds.");
    }
  };

  // Delete campaign
  const remove = async (id) => {
    try {
      setError(null);

      await api.delete(`campaigns/${id}/`, {
        timeout: 60000,
      });

      load();
    } catch (err) {
      console.error(err);
      setError("Failed to delete campaign.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Campaigns</h2>

      {/* Status message */}
      {error && (
        <p style={{ color: "orange", marginBottom: "10px" }}>
          {error}
        </p>
      )}

      {/* Create form */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Campaign name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <button onClick={create} style={{ marginLeft: "10px" }}>
          Create
        </button>
      </div>

      {/* Campaign list */}
      {loading ? (
        <p>Loading campaigns…</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns yet.</p>
      ) : (
        campaigns.map((c) => (
          <div key={c.id} style={{ marginBottom: "8px" }}>
            {c.name}
            <button
              onClick={() => remove(c.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
