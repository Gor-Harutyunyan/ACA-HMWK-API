const image = document.querySelector(".image");
const select = document.querySelector("#select");

async function fetchByBreed(breed) {
  let data = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  let result = await data.json();
  let source = await result.message;
  createImage(source);
}

function createImage(source) {
  const img = document.createElement("img");
  img.setAttribute("src", source);
  img.style.height = "500px";
  img.style.width = "500px";
  image.append(img);
}

select.addEventListener("change", (e) => {
  image.innerHTML = "";
  const value = e.target.value;
  value === "all" ? (image.innerHTML = "") : fetchByBreed(value);
});
