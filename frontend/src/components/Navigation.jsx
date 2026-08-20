import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>{" | "}
      <Link to="/books">Books</Link>{" | "}
      <Link to="/borrow">Borrow</Link>
    </nav>
  );
}

export default Navigation;