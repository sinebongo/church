"use client";

import React, { useState } from "react";
import { useContent } from "@/app/context/ContentProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Background3D } from "./Background3D";

const ContactSection = () => {
  const heading = useContent("contact.heading", "Contact Us");
  const intro = useContent("contact.intro", "We would love to hear from you! Reach out with any questions or comments.");
  const phone = useContent("contact.phone", "+27 (11) 930-3555");
  const email = useContent("contact.email", "elcsa.cdpyl@gmail.com");

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...form }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full py-16 px-4 bg-gradient-to-br from-navy to-navy-dark overflow-x-hidden">
      <Background3D variant="spheres" intensity="subtle" />
      <div className="relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-white text-center mb-8">{heading}</h2>
        <p className="mb-4 text-white/80 text-center text-lg">{intro}</p>
        <p className="mb-8 text-white/80 text-center text-lg font-semibold">
          <span>Phone: </span>
          <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="underline">{phone}</a>
        </p>
        {status === "sent" ? (
          <p className="max-w-xl mx-auto text-center text-white bg-white/10 rounded-lg p-6">
            Thank you! Your message has been sent — we'll be in touch soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl mx-auto">
            <Input
              type="text"
              placeholder="Your Name"
              className="bg-white"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder={email}
              className="bg-white"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Textarea
              placeholder="Your Message"
              rows={4}
              className="bg-white"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {status === "error" && (
              <p className="text-sm text-gold">Something went wrong sending your message. Please try again or call us directly.</p>
            )}
            <Button type="submit" disabled={status === "sending"} className="bg-gold text-navy hover:bg-white">
              {status === "sending" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
