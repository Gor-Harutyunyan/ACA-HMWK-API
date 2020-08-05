const filmContainer = document.querySelector(".film-container");

fetch("https://ghibliapi.herokuapp.com/films")
  .then((data) => data.json())
  .then((data) => {
    data.forEach(({ title, description, director, producer, release_date }) => {
      const newUl = createNewFilm([
        title,
        description,
        director,
        producer,
        release_date,
      ]);
      filmContainer.append(newUl);
    });
  });

/**
 *
 * @param {array} values - array of film descriptors
 */
function createNewFilm(values) {
  const div = document.createElement("div");
  const ul = document.createElement("ul");
  ul.className = "film-info";
  div.className = "film-list";

  values.forEach((value) => {
    const headings = [
      "Title :",
      "Descriptor :",
      "Director :",
      "Producer :",
      "Release Date :",
    ];
    const li = document.createElement("li");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    p.innerText = value;
    h4.innerText = headings[values.indexOf(value)];
    li.append(h4);
    li.append(p);
    ul.append(li);
  });
  div.append(ul);
  return div;
}
