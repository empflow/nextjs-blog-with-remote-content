"use client";

import { FormEvent, useState } from "react";
import axios from "axios";

export default function Feedback() {
  const [data, setData] = useState({ name: "", email: "", satisfied: false });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const res = await axios.post("/api/feedback", data);
    console.log(res.data);
    setSending(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border rounded border-gray-400 max-w-[350px] p-4 m-auto"
    >
      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) =>
            setData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border outline-none border-gray-400 rounded px-3 py-1 focus:shadow-input-outline focus:shadow-blue-500 w-full"
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="border outline-none border-gray-400 rounded px-3 py-1 focus:shadow-input-outline focus:shadow-blue-500 w-full"
        />
      </div>

      <div className="flex gap-2">
        <input
          type="checkbox"
          onChange={(e) =>
            setData((prev) => ({ ...prev, satisfied: e.target.checked }))
          }
          id="satisfied"
        />
        <label htmlFor="satisfied">Are you satisfied?</label>
      </div>

      <button
        className="bg-blue-500 text-white py-2 rounded focus:shadow-button-outline "
        type="submit"
      >
        {sending ? <span>Sending...</span> : "Send"}
      </button>
    </form>
  );
}
