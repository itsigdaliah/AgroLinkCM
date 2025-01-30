import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('common.brand')}</h3>
            <p className="text-sm">{t('footer.tagline')}</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://web.facebook.com/profile.php?id=61564123781021" className="hover:text-gray-300"><FaFacebook size={20} /></a>
              <a href="https://www.x.com/itsigdaliah" className="hover:text-gray-300"><FaTwitter size={20} /></a>
              <a href="https://www.instagram.com/itsigdaliah" className="hover:text-gray-300"><FaInstagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-2">
              <li><Link to="/marketplace" className="hover:text-gray-300">{t('nav.marketplace')}</Link></li>
              <li><Link to="/advisory" className="hover:text-gray-300">{t('nav.advisory')}</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">{t('footer.quickLinks.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">{t('footer.quickLinks.contact')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><FaPhone className="mr-2" /> +237 675339626</li>
              <li className="flex items-center"><FaEnvelope className="mr-2" /> itsigdaliah@gmail.com</li>
              <li className="flex items-center"><FaMapMarkerAlt className="mr-2" /> Yaoundé, Cameroon</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.newsletter.title')}</h3>
            <p className="text-sm mb-4">{t('footer.newsletter.description')}</p>
            <form className="flex">
              <input
                type="email"
                placeholder={t('footer.newsletter.emailPlaceholder')}
                className="px-4 py-2 rounded-l-md text-gray-900 w-full"
              />
              <button className="bg-primary-light px-4 py-2 rounded-r-md hover:bg-primary-dark">
                {t('footer.newsletter.subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-primary-light mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} {t('common.brand')}. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
