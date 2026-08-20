function BookCard({ title, author, category, available }) {
  return (
    <div className="book-card">
      <h3>{title}</h3>

      <p>
        <strong>Author:</strong> {author}
      </p>

      <p>
        <strong>Category:</strong> {category}
      </p>

      <p className={available ? "available" : "not-available"}>
        <strong>Availability:</strong>{" "}
        {available ? "Available" : "Not Available"}
      </p>
    </div>
  );
}

export default BookCard;