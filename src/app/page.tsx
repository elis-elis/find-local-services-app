"use client";

import React, { useState } from "react";
import { SourceData } from "@/lib/ask/types";

export default function HomePage() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [answer, setAnswer] = useState<{ summary: string, sources: SourceData[] } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('/api/ask', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        setResponse(data.error || 'Something went wrong.');
        setAnswer(null);
      } else {
        setResponse('');
        setAnswer(data); // store structured answer
      }
    } catch (error) {
      setResponse('Network or unexpected error.');
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
            placeholder="e.g., Who are the top-rated cat groomers in SF? and what do they charge? How do I book?"
          />
          <button 
            type="submit"
            disabled={loading || !question.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              { loading ? 'Asking...' : 'Ask' }
          </button>
        </form>

        {answer && (
          <div className="mt-6 max-w-xl w-full bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-lg">
            <h2 className="font-semibold text-xl text-blue-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z" />
              </svg>
              Response:
            </h2>
            <p className="mb-4">{answer.summary}</p>
            <ul className="space-y-4">
              {answer.sources.map((src, i) => (
                <li key={i} className="border-l-4 border-blue-400 pl-4">
                  <p className="font-semibold">{src.name}</p>
                  <p>{src.price}</p>
                  <p className="text-sm italic text-gray-600">{src.notes}</p>
                  <p className="text-sm font-medium text-green-600">Neptune Score: {src.neptuneScore}/100</p>
                  <a
                    href={src.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    Visit source
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
