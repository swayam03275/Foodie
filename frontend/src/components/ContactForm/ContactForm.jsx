import React, { useState, useEffect } from "react";
import "./ContactForm.css";
import { FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";

// add contact data to localstorage
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("contactForm"));
    if (savedFormData) {
      setFormData(savedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contactForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    localStorage.removeItem("contactForm");
  };

  return (
    <div className="contact-section ">
      <div className="contact-info">
        <h4>STAY CONNECTED</h4>
        <h2>Get in Touch</h2>
        <p>
          Have any questions, special requests, or feedback? Whether you're
          planning a celebration, booking a table - we’re here for you!
        </p>
        <ul>
          <li>
            <strong>Address:</strong> ABC Restaurant, Haryana
          </li>
          <li>
            <strong>Phone:</strong> +262 697 570 970
          </li>
          <li>
            <strong>Email:</strong> Contact@foodie.com
          </li>
          <li>
            <strong>Hours:</strong> Open 08:00 AM to 10:00 PM
          </li>
        </ul>

        <div className="social-icons">
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp size={24} color="#25D366" />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} color="#E1306C" />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} color="#1DA1F2" />
          </a>
        </div>
      </div>

      <div className="contact-form">
        <h3>Your Details</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Comments / Questions *"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit">CONTACT US</button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
