"use client";

import React, { useState } from "react";

export default function HomePage() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ask', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setResponse(data.answer);

    } catch (error) {
      console.error("Search failed.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-xl space-y-4 bg-white p-6 rounded-2xl shadow"
        >
          <h1 className="text-2xl font-bold"> Ask a local service question</h1>
          <textarea 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={4}
            placeholder="e.g., Who are the top-rated cat groomers in SF? "
          />
          <button 
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              { loading ? 'Asking...' : 'Ask' }
          </button>
        </form>

        {response && (
          <div className="mt-6 max-w-xl bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg mb-2">Response:</h2>
          <p>{response}</p>
        </div>
        )}
      </main>
    </div>
  );
}
