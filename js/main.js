'use strict';

// Массивы данных

var messages = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
];

var names = ['Петя', 'Саша', 'Аня', 'Коля', 'Даша', 'Вася', 'Настя', 'Катя'];

// Необходимые переменные

var photos = [];

var picturesBlock = document.querySelector('.pictures');

var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Константы

var PHOTOS_NUMBER = 25;

//  Функции

// функция перемешивания элементов массива

var shuffle = function (array) {
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
};

// функция получения перемешанного массива численных данных

var randomUniqArr = function (lengthUniqArr, uniqArr) {
  for (var i = 1; i <= lengthUniqArr; i++) {
    uniqArr.push(i);
  }
  shuffle(uniqArr);
  return uniqArr;
};

// функция генерации случайных комментариев

var makeCommentsArr = function (clearCommentsArr) {
  var avatarRandom = [];

  shuffle(names);
  randomUniqArr(6, avatarRandom);

  for (var i = 0; i < Math.floor(Math.random() * 4); i++) {
    clearCommentsArr[i] = {
      avatar: 'img/avatar-' + avatarRandom[i] + '.svg',
      message: messages[Math.floor(Math.random() * 6)],
      name: names[i]
    };
  }
  return clearCommentsArr;
};

// функция получения массива данных фотографий

var photoGenerator = function (photoArr, photosNumber) {
  var photoRandom = [];
  var commentArr = [];

  randomUniqArr(photosNumber, photoRandom);

  for (var i = 0; i < photosNumber; i++) {
    makeCommentsArr(commentArr);

    photoArr[i] = {
      url: 'photos/' + photoRandom[i] + '.jpg',
      description: 'Описание фотографии',
      likes: Math.floor(Math.random() * 186) + 15,
      comments: commentArr
    };
  }

  return photoArr;
};

// функция отрисовки массива фотографий на странице

var renderPhotos = function (photo) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo[i].url;
    photoElement.querySelector('.picture__likes').textContent =
      photo[i].likes;
    photoElement.querySelector('.picture__comments').textContent =
      photo[i].comments.length;

    fragment.appendChild(photoElement);
  }

  picturesBlock.appendChild(fragment);
};

// Исполняемый код

photoGenerator(photos, PHOTOS_NUMBER);
renderPhotos(photos);

