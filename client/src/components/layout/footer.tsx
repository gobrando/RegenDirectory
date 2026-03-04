import { Link } from "wouter";
import { Leaf } from "lucide-react";

export default function Footer() {
  const directoryLinks = [
    { name: "All Products", href: "/directory" },
    { name: "Food & Beverages", href: "/directory?category=food-beverages" },
    { name: "Personal Care", href: "/directory?category=personal-care" },
    { name: "Household", href: "/directory?category=household" },
    { name: "Garden & Farm", href: "/directory?category=garden-farm" },
  ];

  const learnLinks = [
    { name: "About Regenerative", href: "/learn" },
    { name: "Soil Health", href: "/learn#soil-health" },
    { name: "Carbon Sequestration", href: "/learn#carbon" },
    { name: "Biodiversity", href: "/learn#biodiversity" },
    { name: "Certifications", href: "/learn#certifications" },
  ];

  const supportLinks = [
    { name: "For Vendors", href: "/vendor-apply" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Help Center", href: "/help" },
  ];

  return (
    <footer className="bg-earth-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-regen-teal mr-2" />
              <h4 className="text-xl font-bold">RegenDirectory</h4>
            </Link>
            <p className="text-gray-300 text-sm mb-4">
              Connecting conscious consumers with regenerative products that heal our planet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-regen-teal transition-colors duration-200">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-regen-teal transition-colors duration-200">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-regen-teal transition-colors duration-200">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-regen-teal transition-colors duration-200">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          {/* Directory Links */}
          <div>
            <h5 className="font-semibold mb-4">Directory</h5>
            <ul className="space-y-2 text-sm">
              {directoryLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h5 className="font-semibold mb-4">Learn</h5>
            <ul className="space-y-2 text-sm">
              {learnLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 RegenDirectory. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Made with 🌱 for a regenerative future
          </p>
        </div>
      </div>
    </footer>
  );
}
