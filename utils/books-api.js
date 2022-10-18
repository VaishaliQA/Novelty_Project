const axios = require("axios");

// google api call for fetching book information using ISBN as identifier
const fetchBookInfo = async function (isbn_search) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn_search}`;
    const res = await axios.get(url);

    // access first entry of response
    const bookData = res.data.items[0];
    console.log("Book Desc Link", bookData.volumeInfo);

    // parse response
    const isbnList = bookData.volumeInfo.industryIdentifiers;
    const title = bookData.volumeInfo.title;
    const authors = bookData.volumeInfo.authors;
    const publishedDate = bookData.volumeInfo.publishedDate;
    const description = bookData.volumeInfo.description;
    const categories = bookData.volumeInfo.categories;
    const imageLink = bookData.volumeInfo.imageLinks.thumbnail;

    // grab 13 digit ISBN from array
    let isbn13 = "";
    isbnList.forEach((obj) => {
      if (obj.type === "ISBN_13") {
        isbn13 = obj.identifier;
      }
    });

    // structure response into object
    const obj = {
      isbn13: isbn13,
      title: title,
      authors: authors,
      publishedDate: publishedDate,
      description: description,
      categories: categories,
      imageLink: imageLink,
    };

    // return response as stringified object
    return JSON.stringify(obj);
  } catch (err) {
    console.log(err);
  }
};
module.exports = fetchBookInfo;

// sample usage of function
// fetchBookInfo(9781936594115).then((data) => {
//   console.log(JSON.parse(data));
// });
