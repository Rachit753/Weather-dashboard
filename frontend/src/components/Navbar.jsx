import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">Weather Dashboard</h1>
        <div className="space-x-4">
          <Link to="/">Current</Link>
          <Link to="/historical">Historical</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;