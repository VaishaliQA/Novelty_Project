const axios = require("axios");

// google api call for fetching book information using ISBN as identifier
// example ISBN: 9780826501028;
// fetchBookInfo(9780826501028);

const fetchBookInfo = async function (ISBN) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${ISBN}`;
    const res = await axios.get(url);
    return res.data.items;
  } catch (err) {
    console.log(err);
  }
};
module.exports = fetchBookInfo;
