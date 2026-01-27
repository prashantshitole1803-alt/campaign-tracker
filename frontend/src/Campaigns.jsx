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
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const res = await api.get("campaigns/");
      setCampaigns(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const createCampaign = async () => {
    if (!name.trim()) return;

    try {
      await api.post("campaigns/", { name });
      setName("");
      loadCampaigns();
    } catch (err) {
      console.error(err);
      alert("Failed to create campaign");
    }
  };

  const deleteCampaign = async (id) => {
    try {
      await api.delete(`campaigns/${id}/`);
      loadCampaigns();
    } catch (err) {
      console.error(err);
      alert("Failed to delete campaign");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Campaigns</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Campaign name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createCampaign}>Create</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        campaigns.map((c) => (
          <div key={c.id}>
            {c.name}
            <button onClick={() => deleteCampaign(c.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}
