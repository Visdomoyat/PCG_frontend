import { useState } from "react";
import { Link } from "react-router";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Me" },
    { to: "/gallery", label: "Gallery" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
    { to: "/stories", label: "Stories" },
    
  ];

  return (
    <nav className="p-4">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="font-brand text-3xl leading-none tracking-tight text-black sm:text-4xl"
        >
          Private Chef Greg
        </Link>

        {/* Desktop nav */}
        <div className="hidden gap-4 md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-lg font-medium">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex flex-col gap-1.5 rounded p-2 md:hidden"

        >
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
          <span className="h-0.5 w-6 bg-black" />
        </button>
      </div>

      {/* Mobile menu links */}
      {isMenuOpen && (
        <div className="mt-3 flex flex-col gap-3 md:hidden bg-gray-100 p-4 rounded-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
