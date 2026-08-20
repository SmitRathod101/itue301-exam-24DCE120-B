import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

function BooksPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/books");

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading books...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Books</h1>

      {data.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          category={book.category}
          available={book.available}
        />
      ))}
    </div>
  );
}

export default BooksPage;