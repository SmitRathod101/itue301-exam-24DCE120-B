import { useState } from "react";

function BorrowPage() {
  const [memberName, setMemberName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  return (
    <div>
      <h1>Borrow Book</h1>

      <form>
        <input
          type="text"
          placeholder="Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
        />

        <input
          type="date"
          value={borrowDate}
          onChange={(e) => setBorrowDate(e.target.value)}
        />

        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </form>

      <p>Member: {memberName}</p>
      <p>Book: {bookTitle}</p>
    </div>
  );
}

export default BorrowPage;