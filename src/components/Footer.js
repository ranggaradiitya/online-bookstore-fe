import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-center text-white py-3">
      <div className="container">
        <p className="m-0">
          &copy; {new Date().getFullYear()} Online Bookstore. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
