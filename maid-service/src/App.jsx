import React, { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";

function App() {
  const form = useRef();
  const [status, setStatus] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_wi1t98n", "template_of8j64p", form.current, "DsXYj-x6rW4f7LZZk")
      .then(
        () => {
          setStatus("success");
          form.current.reset();
        },
        () => setStatus("error")
      );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200 p-6">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">मेड सेवा पुणे</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded"
        >
          {darkMode ? "☀️ लाइट मोड" : "🌙 डार्क मोड"}
        </button>
      </nav>

      <h2 className="text-2xl mb-4 text-center font-semibold">संपर्क साधा</h2>

      {status === "success" && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
          ✅ आपला संदेश यशस्वीरित्या पाठवला गेला आहे!
        </div>
      )}
      {status === "error" && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
          ❌ काहीतरी चूक झाली आहे. कृपया पुन्हा प्रयत्न करा.
        </div>
      )}

      <form ref={form} onSubmit={sendEmail} className="max-w-xl mx-auto grid gap-4">
        <input name="user_name" type="text" placeholder="तुमचं नाव" required className="border p-2 rounded" />
        <input name="user_phone" type="tel" placeholder="फोन नंबर" required className="border p-2 rounded" />
        <textarea name="message" placeholder="सेवेबद्दल माहिती" required className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">कोटेशन मागवा</button>
      </form>
    </div>
  );
}

export default App;
