import "./App.css";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BorrowPage from "./pages/BorrowPage";

function App() {
  return (
    <div>
      <HomePage />
      <BooksPage />
      <BorrowPage />
    </div>
  );
}

export default App;