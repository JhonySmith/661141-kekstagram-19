'use strict';

var messages = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];

var names = ['Петя', 'Саша', 'Аня', 'Коля', 'Даша', 'Вася', 'Настя', 'Катя'];

//  Функция для создания случайных, неповторяющихся значений

function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex !== 0) {
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

  for (var j = 1; j < 7; j++) {
    avatarRandom.push(j);
    shuffle(avatarRandom);
  }

  for (var k = 0; k < 25; k++) {
    var commentArr = [];
    shuffle(names);
    for (var c = 0; c < 4; c++) {
      commentArr[c] = {
        avatar: 'img/avatar-' + avatarRandom[c] + '.svg',
        message: messages[Math.floor(Math.random() * 6)],
        name: names[c]
      };
    }

    photoArr[k] = {
      url: 'photos/' + photoRandom[k] + '.jpg',
      description: 'Описание фотографии',
      likes: Math.floor(Math.random() * 186) + 15,
      comments: commentArr
    };
  }

  return photoArr;
};

photoGenerator(photos);

var picturesBlock = document.querySelector('.pictures');

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPhotos = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent =
    photo.likes;
  photoElement.querySelector('.picture__comments').textContent =
    photo.comments.length;

  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhotos(photos[i]));
}

picturesBlock.appendChild(fragment);

