import React, { useEffect, useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import axios from 'axios';
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword] = useState('');

  const perPage = 20;

  useEffect(() => {
    let isMounted = true;

    const getBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/books?page=${currentPage}&keyword=${keyword}`
        );
        if (isMounted) {
          setBooks(response.data.data);
          setTotalBooks(response.data.total);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getBooks();

    return () => {
      isMounted = false;
    };
  }, [currentPage, keyword]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const totalPages = Math.ceil(totalBooks / perPage);
  const currentFrom = (currentPage - 1) * perPage + 1;
  const currentTo = Math.min(currentPage * perPage, totalBooks);

  return (
    <PageLayout>
      <div className="container">
        <div className="row">
          {books.map((book) => (
            <div className="col-md-3" key={book.id}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-between mt-4">
          <p>
            Showing{' '}
            <b>
              {currentFrom}-{currentTo}
            </b>{' '}
            of <b>{totalBooks}</b> products
          </p>
          <div>
            <p>
              <div className="d-flex align-items-center">
                <button
                  onClick={handlePrevPage}
                  className={`btn btn-link ${
                    currentPage === 1 ? 'disabled' : 'cursor-pointer'
                  }`}
                  disabled={currentPage === 1}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  className={`btn btn-link ${
                    currentPage === totalPages ? 'disabled' : 'cursor-pointer'
                  }`}
                  disabled={currentPage === totalPages}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
