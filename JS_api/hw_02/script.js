"use strict";

const images = [
  {
    id: 0,
    src: "https://i.pinimg.com/originals/4a/3c/24/4a3c2483df2b149927ad1fa8ff4bb469.jpg",
  },
  {
    id: 1,
    src: "https://i.pinimg.com/originals/01/cb/cd/01cbcdbac066ad07a48d3980f6d8498f.jpg",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/originals/a7/a2/83/a7a283a4bd12e5379f23698f74f4fa92.jpg",
  },
  {
    id: 3,
    src: "https://i.pinimg.com/originals/ab/14/05/ab140583317a152ae5e464d86c7e9998.jpg",
  },
];

const containerEl = document.querySelector(".container");
const prevBtn = document.querySelector(".buttons_prev");
const nextBtn = document.querySelector(".buttons_next");
const navEl = document.querySelector(".nav");

let indexImg = 0;
let currentImg = document.querySelector(".current_img");

prevBtn.addEventListener("click", function () {
  if (indexImg === 0) {
    indexImg = images.length - 1;
  } else {
    indexImg--;
  }
  showImage(indexImg);
});

nextBtn.addEventListener("click", function () {
  if (indexImg === images.length - 1) {
    indexImg = 0;
  } else {
    indexImg++;
  }
  showImage(indexImg);
});

for (let i = 0; i < images.length; i++) {
  const navItem = document.createElement("div");
  navItem.classList.add("nav_item");
  navItem.textContent = i + 1;
  navEl.append(navItem);
}

navEl.addEventListener("click", function (e) {
  indexImg = +e.target.textContent - 1;
  showImage(indexImg);
});

function showImage(index) {
    currentImg.src = images[index].src;
}
