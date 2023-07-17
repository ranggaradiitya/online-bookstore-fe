import React from 'react';

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

const BookCard = ({ book }) => {
  const maxLength = 30; // Set the maximum length for the title

  const truncatedTitle = truncateText(book.title, maxLength);

  return (
    <div className="card mb-0 mt-4">
      <img
        src={book.imageURL}
        className="card-img-top m-auto"
        style={{ width: '200px', height: '200px' }}
        alt={book.title}
      />
      <div className="card-body">
        <h5 className="card-title">
          {truncatedTitle}
          <br></br>
        </h5>
        <p className="card-text">{book.author}</p>
        {/* Other book information */}
      </div>
    </div>
  );
};

export default BookCard;
