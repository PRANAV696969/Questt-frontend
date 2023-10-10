import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const BookDetails = ({ addToCart }) => {
  const [book, setBook] = useState({});
  const { bookID } = useParams();

  useEffect(() => {
    if (bookID && !isNaN(bookID)) {
      console.log(bookID);

      axios.get(`http://localhost:3001/api/books/${bookID}`)

        .then(response => {
          setBook(response.data.book);
          console.log(response.data.book)
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    } else {
      console.error(`Invalid bookID: ${bookID}`);
    }
  }, [bookID]);

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.authors}</p>
      <p>Average Rating: {book.average_rating}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Language: {book.language_code}</p>
      <p>Number of Pages: {book.num_pages}</p>
      <p>Publication Date: {new Date(book.publication_date).toLocaleDateString()}</p>
      <p>Publisher: {book.publisher}</p>
      <button onClick={() => addToCart(book)}>Add to Cart</button>
      <Link to="/cart">View Cart</Link>
    </div>
  );
};

const mapDispatchToProps = {
  addToCart,
};

export default connect(null, mapDispatchToProps)(BookDetails);