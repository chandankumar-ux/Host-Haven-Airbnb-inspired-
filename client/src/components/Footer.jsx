import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Sthaan</h2>
          <p className="text-sm leading-6 text-gray-400">
            Find your perfect stay, explore unique places, and make every trip
            memorable. Your next destination is just a click away.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/explore" className="hover:text-white">Explore</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/help" className="hover:text-white">Help Center</a></li>
            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/faq" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition">
              <FaInstagram />
            </a>
            <a href="https://github.com" className="p-2 rounded-full bg-gray-800 hover:bg-purple-600 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sthaan. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
