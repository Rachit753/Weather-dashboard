import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">Weather Dashboard</h1>
      <div className="space-x-4">
        <Link to="/">Current</Link>
        <Link to="/historical">Historical</Link>
      </div>
    </nav>
  );
}

export default Navbar;