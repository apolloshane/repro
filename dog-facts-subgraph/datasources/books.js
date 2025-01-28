const { RESTDataSource } = require("@apollo/datasource-rest");

class BooksAPI extends RESTDataSource {
  baseURL = "https://openlibrary.org/";

  getBookByQuery(query) {
    console.log("QUERY =", query)
    return this.get(`search.json?q=${query}`)
  }

  getBookByTitle(title) {
    return this.get(`search.json?title=${title}`)
  }

  getBookByAuthor(author) {
    return this.get(`search/authors.json?q=${author}`)
  }
}

module.exports = BooksAPI;