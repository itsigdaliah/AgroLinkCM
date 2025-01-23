import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AgroLink CM</h3>
            <p className="text-sm">Connecting farmers to success in Cameroon</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://web.facebook.com/profile.php?id=61564123781021" className="hover:text-gray-300"><FaFacebook size={20} /></a>
              <a href="https://www.x.com/itsigdaliah" className="hover:text-gray-300"><FaTwitter size={20} /></a>
              <a href="https://www.instagram.com/itsigdaliah" className="hover:text-gray-300"><FaInstagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="hover:text-gray-300">Marketplace</Link></li>
              <li><Link to="/advisory" className="hover:text-gray-300">Advisory</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><FaPhone className="mr-2" /> +237 675339626</li>
              <li className="flex items-center"><FaEnvelope className="mr-2" /> itsigdaliah@gmail.com</li>
              <li className="flex items-center"><FaMapMarkerAlt className="mr-2" /> Yaoundé, Cameroon</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Stay updated with our latest news</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md text-gray-900 w-full"
              />
              <button className="bg-primary-light px-4 py-2 rounded-r-md hover:bg-primary-dark">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-primary-light mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} AgroLink CM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
