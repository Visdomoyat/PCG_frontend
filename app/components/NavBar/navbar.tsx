import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Me" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact" },
    { to: "/stories", label: "Stories" },
  ];

  return (
    <nav className="relative z-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <Link
          to="/"
          className="font-brand relative z-0 text-3xl leading-none tracking-tight text-black sm:text-4xl"
        >
          Private Chef Greg
        </Link>

        {/* Desktop nav — z-10 so links paint above the title if the row ever overlaps */}
        <div className="relative z-10 hidden shrink-0 flex-wrap justify-end gap-4 md:flex">
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
        <div className="mt-3 flex flex-col gap-3 rounded-lg bg-gray-100 p-4 md:hidden">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-lg font-medium">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
