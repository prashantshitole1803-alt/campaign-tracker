import { useEffect, useState } from "react";
import api from "./api";

export default function Quote() {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const loadQuote = async () => {
    try {
      const res = await api.get("quote/");
      setQuote(res.data);
    } catch (err) {
      console.error(err);
      setQuote({ content: "Keep pushing forward!", author: "Server fallback" });
    }
  };

  useEffect(() => { loadQuote(); }, []);

  return (
    <div>
      <blockquote>"{quote.content}"</blockquote>
      <p>- {quote.author}</p>
      <button onClick={loadQuote}>New Quote</button>
    </div>
  );
}
