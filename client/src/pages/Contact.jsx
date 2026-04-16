export default function Contact() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div>
          <p className="text-gray-600 mb-4">
            Have questions, feedback, or need help?  
            We’d love to hear from you.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>📧 Email: support@sthaan.com</li>
            <li>📞 Phone: +91 98765 43210</li>
            <li>📍 Location: India</li>
          </ul>
        </div>

        {/* Form */}
        <form className="bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-gray-100">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400 bg-white shadow-sm"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400 bg-white shadow-sm"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400 bg-white shadow-sm"
          />

          <button
            type="submit"
            className="bg-linear-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
