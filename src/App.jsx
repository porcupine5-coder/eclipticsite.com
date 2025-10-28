import { useState, useEffect, useRef } from 'react';
import { FiSun, FiMoon, FaBars, FaTimes, FaArrowRight, FaShoppingCart, FaChartLine, FaMobileAlt, FaRocket, FaCode, FaSearch, FaShieldAlt, FaHandHoldingUsd, FaCheck, FaPhone, FaInstagram, FaEnvelope, FaSpinner, FaPaperPlane, FaFacebook, FaTwitter, FaLinkedin, FiChevronDown } from 'react-icons/all';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: 'power2.out', duration: 0.6 });
gsap.config({ nullTargetWarn: false, force3D: true });
emailjs.init('_aSFCvXEp-CaA5k_2');

const CURRENCIES = [
  { code: 'USD', name: 'USD ($)' },
  { code: 'EUR', name: 'EUR (€)' },
  { code: 'GBP', name: 'GBP (£)' },
  { code: 'NPR', name: 'NPR (रू)' },
  { code: 'INR', name: 'INR (₹)' }
];

const RATES = { USD: 1, EUR: 0.85, GBP: 0.73, NPR: 132.50, INR: 83.20 };
const SYMBOLS = { USD: '$', EUR: '€', GBP: '£', NPR: 'रू', INR: '₹' };

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [currency, setCurrency] = useState('USD');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-8 py-5 bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="text-2xl font-bold text-indigo-600">Eclipticsite</a>
          <div className="hidden md:flex gap-8">
            {['Home', 'Services', 'Features', 'Pricing', 'Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(`#${l.toLowerCase()}`); }} className="font-medium text-white hover:text-indigo-400">{l}</a>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/20">
            <FaBars className="text-white" />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[9999] flex items-center justify-center" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/30 rounded-3xl p-10 w-80" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 text-red-400"><FaTimes /></button>
            <nav className="space-y-3 mt-4">
              {['Home', 'Services', 'Features', 'Pricing', 'Contact'].map(l => (
                <button key={l} onClick={() => scrollTo(`#${l.toLowerCase()}`)} className="w-full flex items-center justify-between bg-slate-700/60 text-slate-100 px-5 py-4 rounded-xl font-medium">
                  <span>{l}</span><FaArrowRight />
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 px-8">
          <h1 className="text-6xl font-bold text-white mb-6">Transform Your E-commerce Vision</h1>
          <p className="text-xl text-white/90 mb-8">Powerful solutions for modern online businesses</p>
          <button onClick={() => scrollTo('#pricing')} className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-all">Get Today</button>
        </div>
      </section>

      <section id="services" className="py-24 px-8 bg-white dark:bg-slate-900">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-slate-100 mb-16">Our Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: FaShoppingCart, title: 'E-commerce Solutions', desc: 'Complete online store setup with payment integration' },
            { Icon: FaChartLine, title: 'Analytics & Insights', desc: 'Detailed reporting and performance tracking' },
            { Icon: FaMobileAlt, title: 'Mobile Optimization', desc: 'Responsive design for all devices' }
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-slate-700 hover:-translate-y-3 transition-all">
              <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl">
                <s.Icon className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-3">{s.title}</h3>
              <p className="text-gray-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="py-24 px-8 bg-gray-50 dark:bg-slate-800">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-slate-100 mb-16">Why Choose Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Icon: FaRocket, title: 'Fast Development', desc: 'Quick turnaround time with quality code' },
            { Icon: FaMobileAlt, title: 'Responsive Design', desc: 'Optimized for all devices' },
            { Icon: FaCode, title: 'Clean Code', desc: 'Maintainable and efficient' },
            { Icon: FaSearch, title: 'SEO Optimized', desc: 'Built with best practices' },
            { Icon: FaShieldAlt, title: 'Security First', desc: 'Enhanced security measures' },
            { Icon: FaHandHoldingUsd, title: 'Flexible Pricing', desc: 'Negotiable rates' }
          ].map((f, i) => (
            <div key={i} className="bg-white dark:bg-slate-700 rounded-xl p-6 text-center shadow-sm hover:-translate-y-2 transition-all">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full">
                <f.Icon className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="py-24 px-8 bg-white dark:bg-slate-900">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-slate-100 mb-8">Pricing Plans</h2>
        <div className="flex justify-center mb-12">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="px-4 py-2 border-2 border-indigo-500 rounded-lg dark:bg-slate-800 dark:text-slate-100">
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Basic Website', price: 25, features: ['Responsive Design', '5 Pages', 'Contact Form', 'Basic SEO'] },
            { title: 'E-commerce Website', price: 75, features: ['All Basic Features', 'E-commerce Integration', 'Payment Gateway', 'Product Management'], popular: true },
            { title: 'Custom Web App', price: 199, features: ['Custom Development', 'Advanced Features', 'Database Integration', 'API Development'] }
          ].map((p, i) => (
            <div key={i} className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md border-2 ${p.popular ? 'border-indigo-400 scale-105' : 'border-gray-200 dark:border-slate-700'}`}>
              {p.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">MOST POPULAR</div>}
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-slate-100 mb-2">{p.title}</h3>
              <div className="text-center mb-6">
                <span className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">{SYMBOLS[currency]}{Math.round(p.price * RATES[currency])}</span>
                <p className="text-sm text-gray-600 dark:text-slate-400 italic">Price is negotiable</p>
              </div>
              <ul className="space-y-3 mb-6">
                {p.features.map((f, j) => <li key={j} className="flex items-center text-gray-700 dark:text-slate-300"><FaCheck className="text-green-500 mr-2" />{f}</li>)}
              </ul>
              <button onClick={() => scrollTo('#contact')} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all">Get Custom Quote</button>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-24 px-8 bg-gray-50 dark:bg-slate-800">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-slate-100 mb-16">Get In Touch</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">Contact Info</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4"><FaPhone className="text-indigo-600" /><p className="text-gray-900 dark:text-slate-100">+977 9703574761</p></div>
              <div className="flex items-center gap-4"><FaInstagram className="text-indigo-600" /><a href="https://www.instagram.com/7yathartha5_shrestha3" target="_blank" className="text-gray-900 dark:text-slate-100 hover:text-indigo-600">@7yathartha5_shrestha3</a></div>
              <div className="flex items-center gap-4"><FaEnvelope className="text-indigo-600" /><p className="text-gray-900 dark:text-slate-100">ytsshrts@gmail.com</p></div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md">
            <form onSubmit={(e) => { e.preventDefault(); emailjs.send('service_z3wzl4j', 'template_hcsyucg', { from_name: e.target.name.value, from_email: e.target.email.value, subject: e.target.subject.value, message: e.target.message.value, to_email: 'ytsshrts@gmail.com' }).then(() => alert('Message sent!')); e.target.reset(); }}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">Send Message</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input type="text" name="name" placeholder="Your Name" required className="px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:border-indigo-500 focus:outline-none" />
                <input type="email" name="email" placeholder="Your Email" required className="px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:border-indigo-500 focus:outline-none" />
              </div>
              <input type="text" name="subject" placeholder="Subject" required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 focus:border-indigo-500 focus:outline-none mb-4" />
              <textarea name="message" placeholder="Your Message" rows={5} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-slate-100 resize-none focus:border-indigo-500 focus:outline-none mb-6" />
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all"><span>Send Message</span><FaPaperPlane /></button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Eclipticsite</h3>
          <p className="text-gray-400 mb-8">Building exceptional web experiences</p>
          <div className="flex justify-center gap-6 mb-8">
            {[{ Icon: FaFacebook, href: '#' }, { Icon: FaTwitter, href: '#' }, { Icon: FaLinkedin, href: '#' }, { Icon: FaInstagram, href: 'https://www.instagram.com/7yathartha5_shrestha3' }].map((s, i) => (
              <a key={i} href={s.href} target={s.href !== '#' ? '_blank' : undefined} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 text-gray-400 hover:text-indigo-400 transition-colors"><s.Icon size={20} /></a>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6"><p className="text-gray-500 text-sm">&copy; 2024 Eclipticsite. All rights reserved.</p></div>
        </div>
      </footer>

      <button onClick={() => setIsDark(!isDark)} className="fixed bottom-6 right-6 z-[999] w-14 h-14 flex items-center justify-center rounded-full shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white">
        {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>
    </div>
  );
}

export default App;
