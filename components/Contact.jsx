"use client";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState(
    "idle" | "loading" | "success" | "error" | "idle"
  );
  const [message, setMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "6950b0aa-b475-4377-a303-10ec5a19f936");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      if (res.success) {
        setStatus("success");
        setMessage("Message sent successfully. I’ll get back to you soon!");
        event.currentTarget.reset();
      } else {
        setStatus("error");
        setMessage(res.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <div
      id="contact"
      className="w-full px-[12%] py-10 scroll-mt-20 bg-[url('/assets/footer-bg-color.png')] bg-no-repeat bg-[length:90%_auto] bg-center dark:bg-none"
    >
      <h4 className="text-center mb-2 text-lg font-Ovo">Connect with me</h4>
      <h2 className="text-center text-5xl font-Ovo">Get in touch</h2>
      <p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo">
        I&apos;d love to hear from you! If you have any questions, comments or
        feedback, please use the form below.
      </p>

      <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
        <input
          type="hidden"
          name="subject"
          value="Okiemute Egokiphovwen - New form Submission"
        />

        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <input
            type="text"
            placeholder="Enter your name"
            className="px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30"
            required
            name="name"
            disabled={status === "loading"}
          />

          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white dark:bg-darkHover/30"
            required
            name="email"
            disabled={status === "loading"}
          />
        </div>

        <textarea
          rows={6}
          placeholder="Enter your message"
          className="w-full px-4 py-2 focus:ring-1 outline-none border border-gray-300 dark:border-white/30 rounded-md bg-white mb-6 dark:bg-darkHover/30"
          required
          name="message"
          disabled={status === "loading"}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className={`py-2 px-8 w-max flex items-center justify-center gap-2 rounded-full mx-auto transition
            ${
              status === "loading"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black/80 text-white hover:bg-black dark:bg-transparent dark:border dark:border-white/30 dark:hover:bg-darkHover"
            }`}
        >
          {status === "loading" ? "Sending..." : "Submit now"}
          {status !== "loading" && (
            <img src="/assets/right-arrow-white.png" alt="" className="w-4" />
          )}
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              status === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
