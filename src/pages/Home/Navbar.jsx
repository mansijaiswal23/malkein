import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { HeartPlus, ShoppingCart, Menu, X, Search, LogOut, User } from "lucide-react";
import logo from "../../../src/assets/images/malkein.png";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext"; // ✅ ADDED

const navLinks = [
  { name: "Bridal", path: "/bridal" },
  { name: "Women", path: "/women" },
  { name: "Men", path: "/men" },
  { name: "Categories", path: "/category" },
  { name: "Policies", path: "/policies" },
  { name: "About", path: "/about" },
];

const placeholders = [
  "for sarees",
  "for bridal",
  "for men",
  "for women",
  "Chandni Chowk bridal",
  "under 5k",
];

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [isOpen]);

  return [isOpen, setIsOpen, ref];
}

function AuthDropdown({ onNavigate }) {
  return (
    <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-44">
      <button
        onPointerDown={(e) => { e.preventDefault(); onNavigate("/sign-in"); }}
        className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#DB0000] font-medium transition-colors flex items-center gap-2 cursor-pointer"
      >
        <User size={15} /> Sign In
      </button>
      <div className="h-px bg-gray-100 mx-3" />
      <button
        onPointerDown={(e) => { e.preventDefault(); onNavigate("/sign-up"); }}
        className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#DB0000] font-medium transition-colors flex items-center gap-2 cursor-pointer"
      >
        <User size={15} /> Sign Up
      </button>
    </div>
  );
}

function ProfileDropdown({ user, onNavigate, onLogout }) {
  return (
    <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden w-52">
      <div className="px-4 py-3 bg-red-50 border-b border-red-100">
        <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
        <p className="text-xs text-gray-400 truncate">{user.email || user.phone}</p>
      </div>
      <button
        onPointerDown={(e) => { e.preventDefault(); onNavigate("/profile"); }}
        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <User size={14} /> My Profile
      </button>
      <div className="h-px bg-gray-100 mx-3" />
      <button
        onPointerDown={(e) => { e.preventDefault(); onLogout(); }}
        className="w-full text-left px-4 py-2.5 text-sm text-[#DB0000] hover:bg-red-50 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <LogOut size={14} /> Sign Out
      </button>
    </div>
  );
}

function Avatar({ user }) {
  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "U";
  return (
    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#DB0000] text-white font-semibold text-sm shrink-0 select-none">
      {user.avatar ? (
        <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const [authOpen, setAuthOpen, authRef] = useDropdown();
  const [profileOpen, setProfileOpen, profileRef] = useDropdown();

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleNavigate = useCallback((path) => {
    setAuthOpen(false);
    setProfileOpen(false);
    navigate(path);
  }, [navigate, setAuthOpen, setProfileOpen]);

  const handleLogout = useCallback(() => {
    logout();
    setProfileOpen(false);
    navigate("/");
  }, [logout, navigate, setProfileOpen]);

  // ✅ Wishlist icon navigates to /wishlist if items exist, else /empty-wishlist
  const handleWishlistClick = () => {
    navigate(wishlistCount > 0 ? "/wishlist" : "/empty-wishlist");
  };

  return (
    <nav className="w-full bg-white shadow-sm">

      {/* ── DESKTOP ── */}
      <div className="hidden md:flex items-center justify-between px-8 py-3 gap-6">

        {/* Logo */}
        <div className="flex flex-col items-start shrink-0">
          <a href="/">
            <img src={logo} alt="Malkein logo" className="h-14 w-auto" />
          </a>
          <p className="text-black -mt-3 font-inter text-[17.53px] leading-[100%] tracking-[0]">
            Discover
          </p>
        </div>

        {/* Nav links */}
        <div className="flex items-center justify-center gap-6 flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-black font-inter text-[17.53px] leading-[100%] tracking-[0] hover:text-[#DB0000] transition-colors duration-150"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative flex items-center bg-[#D9D9D9] rounded-[23.62px] px-4 py-3 w-[307.37px] h-[48.46px] overflow-hidden">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent text-sm text-gray-600 outline-none w-full"
          />
          {!searchValue && (
            <div className="absolute left-5 flex items-center pointer-events-none">
              <span className="text-base text-gray-400 mr-1">Search</span>
              <div className="h-5 overflow-hidden">
                <div
                  className="transition-transform duration-500"
                  style={{ transform: `translateY(-${placeholderIndex * 20}px)` }}
                >
                  {placeholders.map((text, i) => (
                    <div key={i} className="h-5 text-[#DB0000] text-base">
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <Search size={15} className="text-gray-400 shrink-0" />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Auth / Profile */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="hover:scale-95 transition-transform"
                title={user.name}
              >
                <Avatar user={user} />
              </button>
              {profileOpen && (
                <ProfileDropdown
                  user={user}
                  onNavigate={handleNavigate}
                  onLogout={handleLogout}
                />
              )}
            </div>
          ) : (
            <div className="relative" ref={authRef}>
              <button
                onClick={() => setAuthOpen((p) => !p)}
                className="bg-[#DB0000] hover:bg-red-700 active:scale-95 text-white text-md font-medium px-5 py-2 rounded-md transition-all duration-150 cursor-pointer"
              >
                Sign in
              </button>
              {authOpen && (
                <AuthDropdown onNavigate={handleNavigate} />
              )}
            </div>
          )}

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(217,217,217,0.6)_-6.31%,rgba(115,115,115,0.6)_93.69%)] hover:scale-95 ${location.pathname === "/cart" ? "text-red-600" : "text-white"}`}
          >
            <ShoppingCart size={20} className="fill-current" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#CC0000] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>

          {/* ✅ FIXED Wishlist — correct route + live badge count */}
          <div
            onClick={handleWishlistClick}
            className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(217,217,217,0.6)_-6.31%,rgba(115,115,115,0.6)_93.69%)] hover:scale-95 transition-colors ${location.pathname === '/wishlist' || location.pathname === '/empty-wishlist' ? 'text-red-600' : 'text-white'}`}
          >
            <HeartPlus size={20} className="fill-current" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#CC0000] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden">

        {/* Mobile top bar */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex flex-col items-start">
            <img src={logo} alt="Malkein logo" className="h-8 w-auto" />
            <p className="text-gray-500 text-xs -mt-2">Discover</p>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen((p) => !p)}>
                  <Avatar user={user} />
                </button>
                {profileOpen && (
                  <ProfileDropdown
                    user={user}
                    onNavigate={handleNavigate}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            ) : (
              <div className="relative" ref={authRef}>
                <button
                  onClick={() => setAuthOpen((p) => !p)}
                  className="w-16 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 rounded-md transition-colors cursor-pointer"
                >
                  Sign in
                </button>
                {authOpen && (
                  <AuthDropdown onNavigate={handleNavigate} />
                )}
              </div>
            )}

            {/* ✅ FIXED Mobile Wishlist — correct route + live badge count */}
            <div
              onClick={handleWishlistClick}
              className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(217,217,217,0.6)_-6.31%,rgba(115,115,115,0.6)_93.69%)] hover:scale-95 transition-colors ${location.pathname === '/wishlist' || location.pathname === '/empty-wishlist' ? 'text-red-600' : 'text-white'}`}
            >
              <HeartPlus size={18} className="fill-current" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CC0000] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </div>

            <div
              onClick={() => navigate("/cart")}
              className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(180deg,rgba(217,217,217,0.6)_-6.31%,rgba(115,115,115,0.6)_93.69%)] hover:scale-95 ${location.pathname === '/cart' ? 'text-red-600' : 'text-white'}`}
            >
              <ShoppingCart size={18} className="fill-current" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#CC0000] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile search + hamburger */}
        <div className="px-1 pb-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMenuOpen((m) => !m)}
              className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2 flex-1">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-transparent text-sm text-gray-600 outline-none w-full"
              />
              {!searchValue && (
                <span className="absolute left-10 text-sm text-gray-400 pointer-events-none">
                  Search for <span className="text-red-500">sarees</span>...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile nav menu */}
        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1 shadow-md">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-700 hover:text-red-600 font-medium py-2.5 border-b border-gray-50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}