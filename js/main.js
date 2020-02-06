"use strict";

var messages = [
  "Всё отлично!",
  "В целом всё неплохо.Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !"
];

var names = ["Петя", "Саша", "Аня", "Коля", "Даша", "Вася", "Настя", "Катя"];

//Функция для создания случайных, неповторяющихся значений
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var photos = [];

var photoGenerator = function (photoArr) {
  var photoRandom = [];
  var avatarRandom = [];

  for (var i = 1; i < 26; i++) {
    photoRandom.push(i);
    shuffle(photoRandom);
  }

  for (var i = 1; i < 7; i++) {
    avatarRandom.push(i);
    shuffle(avatarRandom);
  }

  for (var i = 0; i < 25; i++) {
    var commentArr = [];
    shuffle(names);
    for (var j = 0; j < 4; j++) {
      commentArr[j] = {
        avatar: "img/avatar-" + avatarRandom[j] + ".svg",
        message: messages[Math.floor(Math.random() * 6)],
        name: names[j]
      };
    }

    photoArr[i] = {
      url: "photos/" + photoRandom[i] + ".jpg",
      description: "Описание фотографии",
      likes: Math.floor(Math.random() * 186) + 15,
      comments: commentArr
    };
  }

  return photoArr;
};

photoGenerator(photos);

var picturesBlock = document.querySelector(".pictures");

var photoTemplate = document.querySelector("#picture").content.querySelector('.picture');

var renderPhotos = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector(".picture__img").src = photo.url;
  photoElement.querySelector(".picture__likes").textContent =
    photo.likes;
  photoElement.querySelector(".picture__comments").textContent =
    photo.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhotos(photos[i]));
}

picturesBlock.appendChild(fragment);

