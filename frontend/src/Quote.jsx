import { useEffect, useState } from "react";
import api from "./api";

export default function Quote() {
  const [quote, setQuote] = useState({ content: "", author: "" });

  const loadQuote = async () => {
    try {
      const res = await api.get("quote/");
      setQuote(res.data);
    } catch (err) {
      console.error("Error fetching quote:", err);
      setQuote({ content: "Stay motivated!", author: "Server fallback" });
    }
  };

  useEffect(() => {
    loadQuote();
  }, []);

  return (
    <div>
      <h2>Quote of the Day</h2>
      <blockquote>"{quote.content}"</blockquote>
      <p>- {quote.author}</p>
      <button onClick={loadQuote}>Refresh</button>
    </div>
  );
}
