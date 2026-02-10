import { FaBitbucket, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const socialLinks = [
  { href: "https://www.linkedin.com/in/antoniocuoco21/", icon: <FaLinkedin />, label: "LinkedIn", color: "text-blue-500" },
  { href: "https://bitbucket.org/99dev-blog-and-cms/", icon: <FaBitbucket />, label: "Bitbucket", color: "text-blue-500" },
  { href: "mailto:99devstudio@gmail.com", icon: <MdEmail />, label: "Email", color: "text-slate-500" },
];

const Footer = () => {
  return (
    <footer className="w-full bg-transparent flex flex-col z-10 relative overflow-hidden">
      {/* Footer */}
      <div className="w-full px-4 pb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        {/* Socials */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-slate-500 uppercase tracking-widest mb-4">Socials</p>
          <div className="flex gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center justify-center w-16 h-16 rounded-full border border-black/20 hover:bg-white hover:${link.color + "/50"} transition-all duration-300 ${link.color}`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Legal / Copyright */}
        <div className="flex flex-col md:items-end gap-2 text-sm text-slate-500 font-mono">
          <div className="flex gap-6 mb-4">
            <a href="https://www.iubenda.com/privacy-policy/2400137" className="hover:text-indigo-500 transition-colors">Privacy Policy</a>
            <a href="https://www.iubenda.com/privacy-policy/46134369/cookie-policy" className="hover:text-indigo-500 transition-colors">Cookie Policy</a>
          </div>
          <p>© 2024 Antonio Cuoco. All rights reserved.</p>
          <p>Designed & Built with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
