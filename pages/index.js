import React, { useEffect, useState } from 'react';
import { FcApproval } from 'react-icons/fc';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RiMailSendLine } from 'react-icons/ri';
import dayjs from 'dayjs';
import styles from './styles.module.css'; // Import the styles.module.css file

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    description: '',
  });

  const [darkMode, setDarkMode] = useState(true); // Add darkMode state variable

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (
      form.name !== '' &&
      form.email !== '' &&
      form.topic !== '' &&
      form.description !== ''
    ) {
      setLoading(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setAlert(true);
          setForm({
            name: '',
            email: '',
            topic: '',
            description: '',
          });
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, [alert]);


  return (
    <div
      className={`flex justify-center items-center min-h-screen relative ${
        darkMode ? styles.darkMode : styles.lightMode
      }`}
    >
    
    <button
        className={`fixed top-4 right-4 p-2 rounded-full ${
          darkMode ? 'bg-gray-300 text-gray-800' : 'bg-gray-800 text-white'
        }`}
        onClick={toggleDarkMode}
      >
        <span role="img" aria-label="Dark Mode">
          {darkMode ? '\u2609' : '\u263E'} {/* Replace text with transparent emojis */}
        </span>
      </button>
      <form
        className={`space-y-3 w-full max-w-lg mx-auto p-5 relative pt-10 ${
          darkMode ? 'bg-gray-800' : 'bg-gray'
        }`}
        onSubmit={submitForm}
      >
        {alert && (
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 bg-lime-700 border border-lime-300 ${
            darkMode ? 'text-white' : 'text-gray-700'
          } px-4 py-2 rounded text-center`}>
            <FcApproval className="inline-block mr-2" size={22} />
            <strong className={`font-bold mr-1 ${darkMode ? 'text-white' : 'text-emerald-50'}`}>
              Success!
            </strong>
          </div>
        )}
        <p className={`font-bold text-3xl text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Contact Form
        </p>
        <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          <span className="font-semibold">Full Name</span>
          <input
            name="name"
            type="text"
            className={`form-input form-field-contact ${
              darkMode ? 'bg-gray-700 border-transparent text-white' : 'bg-gray-200 text-gray-800'
            }`}
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
          />
        </label>
        <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          <span className="font-semibold">Email</span>
          <input
            name="email"
            type="email"
            className={`form-input form-field-contact ${
              darkMode ? 'bg-gray-700 border-transparent text-white' : 'bg-gray-200 text-gray-800'
            }`}
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
          />
        </label>
        <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          <span className="font-semibold">Topic</span>
          <input
            name="topic"
            type="text"
            className={`form-input form-field-contact ${
              darkMode ? 'bg-gray-700 border-transparent text-white' : 'bg-gray-200 text-gray-800'
            }`}
            placeholder="Topic"
            onChange={handleChange}
            value={form.topic}
          />
        </label>
        <label className={`block ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          <span className="font-semibold">Description</span>
          <textarea
            name="description"
            className={`form-textarea form-field-contact resize-none ${
              darkMode ? 'bg-gray-700 border-transparent text-white' : 'bg-gray-200 text-gray-800'
            }`}
            rows="5"
            placeholder="Description"
            onChange={handleChange}
            value={form.description}
          />
        </label>

        <div className="flex justify-center">
          <button
            className={`bg-gray-100 px-3 py-1 font-semibold shadow-md rounded-md w-40 border-2 border-gray-400 disabled:cursor-not-allowed ${darkMode ? 'bg-black-700 border-transparent text-black' : 'text-gray-700'} ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <div className="animate-spin">
                  <AiOutlineLoading3Quarters size={18} />
                </div>
                <p>Sending</p>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <RiMailSendLine size={50} />
                <p>Send Message</p>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
