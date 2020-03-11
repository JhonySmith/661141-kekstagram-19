'use strict';

(function () {
  var COMMENTS_NUMBER = Math.floor(Math.random() * 4);

  // Входные массивы для формирования готовых данных

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо.Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ? !'
  ];

  var names = ['Петя', 'Саша', 'Аня', 'Коля', 'Даша', 'Вася', 'Настя', 'Катя'];

  // Функция перемешивания элементов массива

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

  // Функция получения перемешанного массива численных данных

  var randomUniqArr = function (lengthUniqArr, uniqArr) {
    for (var i = 1; i <= lengthUniqArr; i++) {
      uniqArr.push(i);
    }
    shuffle(uniqArr);
    return uniqArr;
  };

  var photoGenerator = function (photoArr, photosNumber) {
    var photoRandom = [];
    var commentArr = [];

    randomUniqArr(photosNumber, photoRandom);

    for (var i = 0; i < photosNumber; i++) {
      makeCommentsArr(commentArr);
      var LIKES_NUMBER = Math.floor(Math.random() * 186) + 15;

      photoArr[i] = {
        url: 'photos/' + photoRandom[i] + '.jpg',
        description: 'Описание фотографии',
        likes: LIKES_NUMBER,
        comments: commentArr
      };
    }

    return photoArr;
  };

  // функция генерации случайных комментариев

  var makeCommentsArr = function (clearCommentsArr) {
    var avatarRandom = [];

    shuffle(names);
    randomUniqArr(6, avatarRandom);

    for (var i = 0; i < COMMENTS_NUMBER; i++) {
      var RANDOM_MESSAGE = Math.floor(Math.random() * 6);

      clearCommentsArr[i] = {
        avatar: 'img/avatar-' + avatarRandom[i] + '.svg',
        message: messages[RANDOM_MESSAGE],
        name: names[i]
      };
    }
    return clearCommentsArr;
  };

  window.data = {
    photoGenerator: photoGenerator
  };
})();
