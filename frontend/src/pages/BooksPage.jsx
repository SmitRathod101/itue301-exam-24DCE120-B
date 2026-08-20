import BookCard from "../components/BookCard";

function BooksPage() {
  return (
    <div>
      <h1>Books</h1>

      <BookCard
        title="BOOK 1"
        author="Smit Rathod"
        category="Fiction"
        available={true}
      />

      <BookCard
        title="Book 2"
        author="Smit Rathod"
        category="Programming"
        available={false}
      />
    </div>
  );
}

export default BooksPage;