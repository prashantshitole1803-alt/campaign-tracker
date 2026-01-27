import { useEffect, useState } from "react";
import api from "./api";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [form, setForm] = useState({});

  const load = async () => {
    const res = await api.get("campaigns/");
    setCampaigns(res.data);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    await api.post("campaigns/", form);
    setForm({});
    load();
  };

  const remove = async (id) => {
    await api.delete(`campaigns/${id}/`);
    load();
  };

  return (
    <div>
      <h2>Campaigns</h2>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <button onClick={create}>Create</button>

      {campaigns.map(c => (
        <div key={c.id}>
          {c.name}
          <button onClick={()=>remove(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
