import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { Icon: Github, href: "https://github.com/amritraj006", label: "GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/amrit-raj-54652b294/", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:amritraj8887@gmail.com", label: "Email" },
];

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const [result, setResult] = useState("");

  const isHeadingInView = useInView(headingRef, { once: false, margin: "-80px" });
  const isFormInView = useInView(formRef, { once: false, margin: "-80px" });

  // ✅ ADDED SUBMIT FUNCTION ONLY
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");

    const formData = new FormData(event.target);
    formData.append("access_key", "cf7b6cdc-ab31-40a6-852c-e1ac32ac5a60");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-8 bg-[#0a0a0a] min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[#00f0ff] rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[#7000ff] rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-2xl mx-auto w-full relative z-10" ref={headingRef}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-[#00f0ff] font-mono text-lg mb-4"
        >
          06. What's Next?
        </motion.p>

        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Get In Touch
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-lg leading-relaxed mb-12"
        >
          Although I'm not currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </motion.p>

        {/* ✅ ONLY WRAPPED WITH FORM */}
        <form onSubmit={onSubmit} ref={formRef} className="flex flex-col gap-5 w-full max-w-md mx-auto">
          
          {[
            { type: "text", placeholder: "Your Name", name: "name" },
            { type: "email", placeholder: "Your Email", name: "email" },
          ].map((field, i) => (
            <motion.input
              key={field.placeholder}
              type={field.type}
              name={field.name}   // ✅ added
              required
              placeholder={field.placeholder}
              initial={{ opacity: 0, x: -30 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-full bg-[#111]/80 border border-gray-800 rounded-lg px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 text-sm"
            />
          ))}

          <motion.textarea
            name="message"   // ✅ added
            required
            placeholder="Your Message"
            rows="5"
            initial={{ opacity: 0, x: -30 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full bg-[#111]/80 border border-gray-800 rounded-lg px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 resize-none text-sm"
          />

          <motion.button
            type="submit"   // ✅ added
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative mt-2 px-8 py-4 font-semibold rounded-lg border-2 border-[#00f0ff] text-[#00f0ff] overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-[#00f0ff] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              Say Hello
            </span>
          </motion.button>

          {/* ✅ result message */}
          <span className="text-sm text-gray-400">{result}</span>

          {/* Social Icons (unchanged) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-6 mt-10"
          >
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4, color: "#00f0ff" }}
                className="text-gray-400 transition-colors duration-300 relative group"
              >
                <Icon className="w-6 h-6" />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isFormInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-32 border-t border-gray-800 pt-8 flex justify-center text-sm font-mono text-gray-500"
        >
          <p>Designed & Built by Amrit Raj</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;