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
import api from "./api"; // Make sure api.js has your deployed backend URL

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [loading, setLoading] = useState(true); // Show loading while fetching
  const [error, setError] = useState(null);     // Show errors if API fails

  // Load campaigns from backend
  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("campaigns/"); // Uses /api/campaigns/
      setCampaigns(res.data);
    } catch (err) {
      console.error("Failed to load campaigns:", err);
      setError("Failed to load campaigns from backend.");
      setCampaigns([]); // fallback to empty list
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Create new campaign
  const create = async () => {
    if (!form.name.trim()) return alert("Name is required");
    try {
      await api.post("campaigns/", form);
      setForm({ name: "" });
      load();
    } catch (err) {
      console.error("Failed to create campaign:", err);
      alert("Failed to create campaign. Check backend or network.");
    }
  };

  // Delete campaign
  const remove = async (id) => {
    try {
      await api.delete(`campaigns/${id}/`);
      load();
    } catch (err) {
      console.error("Failed to delete campaign:", err);
      alert("Failed to delete campaign. Check backend or network.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Campaigns</h2>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* New campaign input */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Campaign Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <button onClick={create} style={{ marginLeft: "0.5rem" }}>
          Create
        </button>
      </div>

      {/* Loading or campaigns list */}
      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <ul>
          {campaigns.map((c) => (
            <li key={c.id} style={{ marginBottom: "0.5rem" }}>
              {c.name}{" "}
              <button onClick={() => remove(c.id)} style={{ marginLeft: "0.5rem" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
