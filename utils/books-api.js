const axios = require("axios");

// google api call for fetching book information using ISBN as identifier
const fetchBookInfo = async function (ISBN) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${ISBN}`;
    const res = await axios.get(url);

    // access first entry of response, parse into relevent fields
    const bookData = res.data.items[0];

    const title = bookData.volumeInfo.title;
    const authors = bookData.volumeInfo.authors;
    const publishedDate = bookData.volumeInfo.publishedDate;
    const description = bookData.volumeInfo.description;
    const isbn_13 =
      bookData.volumeInfo.industryIdentifiers[0].industryIdentifiers;
    const imageLink = bookData.volumeInfo.imageLinks.smallThumbnail;
    const buyLink = bookData.saleInfo.buyLink;

    const obj = {
      title: title,
      authors: authors,
      publishedDate: publishedDate,
      description: description,
      isbn_13: isbn_13,
      imageLink: imageLink,
      buyLink: buyLink,
    };

    return JSON.stringify(obj);
  } catch (err) {
    console.log(err);
  }
};
module.exports = fetchBookInfo;

// sample usage of function
// fetchBookInfo(9780826501028).then((data) => {
//   console.log(JSON.parse(data));
// });
