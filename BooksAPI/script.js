const input = document.querySelector("#input");
const button = document.querySelector("#btn");
const books = document.querySelector(".book-container");
const pagination = document.querySelector(".pagination");

const BASE_URL = `http://openlibrary.org/search.json?q=`;

/**
 * fetches the data by book name and page
 * @param {string} param - name of the book converted to URL part
 * @param {number} page - indicates which page to load
 */
async function doGet(param, page) {
  let response;
  if (page === 1) {
    response = await fetch(`${BASE_URL}${param}`);
  } else {
    response = await fetch(`${BASE_URL}${param}&page=${page}`);
  }

  let json = await response.json();
  return json;
}

const state = {
  inputValue: "",
  urlPart: "",
  books: [],
  currentPage: 1,
};

/**
 * renders results of search value
 */
async function render() {
  books.textContent = "Loading...";
  pagination.innerHTML = "";
  state.books = [];
  const data = await doGet(state.urlPart, state.currentPage);
  state.numFound = await data.numFound;
  state.pageCount = Math.ceil(state.numFound / 100);
  createPages(state.pageCount);
  const bookData = await data.docs;
  books.textContent = "";
  bookData.forEach(({ title, author_name, publish_year, subject }) => {
    const book = {};
    book.title = title;
    book.authorName = author_name ? author_name[0] : "undefined";
    book.publishYear = publish_year ? publish_year[0] : "undefined";
    book.subject = subject ? subject.slice(0, 5) : "undefined";
    state.books.push(book);
    state.books.forEach((book) => {
      createElement(book);
    });
  });
}

/**
 * creates pagination depending on search results num found
 * @param {number} value - quantity of pages to create
 */
function createPages(value) {
  pagination.innerText = "";
  for (let i = 1; i <= value; i++) {
    const newPage = document.createElement("a");
    newPage.classList.add("page");
    newPage.innerText = i;
    newPage.style.padding = "20px";
    newPage.style.cursor = "pointer";
    pagination.append(newPage);
  }
}

/**
 * creates HTML element using each results info
 * @param {object} book - object with information about book
 */
function createElement(book) {
  const bookInfo = document.createElement("div");
  bookInfo.className = "book-info";
  for (let value of Object.values(book)) {
    const div = document.createElement("div");
    div.innerText = value;
    bookInfo.append(div);
  }

  books.append(bookInfo);
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  books.innerText = "";
  pagination.innerText = "";
  state.inputValue = input.value;
  state.urlPart = state.inputValue.replace(/\s/g, "+"); //replaceAll does not work on current wersion of chrome
  render();
  input.value = "";
});

pagination.addEventListener("click", (event) => {
  event.preventDefault();

  if (event.target.classList.contains("page")) {
    console.log(event.target.text);
    state.currentPage = event.target.text;
  }
  books.innerText = "";

  render();
});
