import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `relative px-4 py-2 text-sm font-medium transition duration-300 group ${
      location.pathname === path
        ? "text-white"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50">
      
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/10 to-purple-500/20 blur-2xl opacity-70"></div>

      <div className="relative backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-2xl">🌦</span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Weather Dashboard
            </span>
          </h1>

          <div className="flex items-center gap-6">

            <Link to="/" className={linkClass("/")}>
              Current

              {location.pathname === "/" && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"></span>
              )}

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link to="/historical" className={linkClass("/historical")}>
              Historical

              {location.pathname === "/historical" && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"></span>
              )}

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;