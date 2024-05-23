// import axios from 'axios';

// const API_BASE_URL = 'https://openlibrary.org';

// export const fetchBooks = async (page, pageSize, author) => {
//   const response = await axios.get(`${API_BASE_URL}/search.json`, {
//     params: {
//       author,
//       page,
//       limit: pageSize,
//     },
//   });
//   return response.data;
// };

export const fetchBooks = async (page, pageSize, author) => {
  const response = await fetch(`https://openlibrary.org/search.json?author=${author}&page=${page}&limit=${pageSize}`);
  const result = await response.json();

  const books = await Promise.all(result.docs.map(async (book) => {
    const authorKey = book.author_key[0]; // Assuming the first author is the main author

    // Fetch author details
    const authorResponse = await fetch(`https://openlibrary.org/authors/${authorKey}.json`);
    const authorDetails = await authorResponse.json();

    return {
      ...book,
      author_birth_date: authorDetails.birth_date,
      author_top_work: authorDetails.top_work
    };
  }));

  return {
    docs: books,
    numFound: result.numFound
  };
};

