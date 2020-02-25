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

var ESC_KEY = 'Escape';

var uploadFile = document.querySelector('#upload-file');
var photoEditForm = document.querySelector('.img-upload__overlay');
var photoEditorCloseButton = photoEditForm.querySelector('.img-upload__cancel');
var effectLevelPin = photoEditForm.querySelector('.effect-level__pin');
var imgUploadPreview = photoEditForm.querySelector('.img-upload__preview img');
var effectLevelDepth = photoEditForm.querySelector('.effect-level__depth');
var effectLevelLine = photoEditForm.querySelector('.effect-level__line');

var onPhotoEditorEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePhotoEditor();
  }
};

var openPhotoEditor = function () {
  photoEditForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPhotoEditorEscPress);
};

var closePhotoEditor = function () {
  photoEditForm.classList.add('hidden');
  document.removeEventListener('keydown', onPhotoEditorEscPress);
  document.querySelector('body').classList.remove('modal-open');
  uploadFile.value = null;
};

uploadFile.addEventListener('change', function () {
  openPhotoEditor();
});

photoEditorCloseButton.addEventListener('click', function () {
  closePhotoEditor();
});

var effectChrome = photoEditForm.querySelector('.effects__preview--chrome');

effectChrome.addEventListener('click', function () {
  imgUploadPreview.style.filter = 'grayscale(0.9)';

  effectLevelPin.addEventListener('mouseup', function () {
    var wdd = (Math.round(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 10)) / 10;
    imgUploadPreview.style.filter = 'grayscale(' + wdd + ')';
  });

});

var uploadHashtags = photoEditForm.querySelector('.text__hashtags');
var REG_EXP = /[$%&'*+/=?^_`{|}.,]/;

var checkingValidationHastags = function (hastags) {
  var invalText = [];
  var hashtagsElements = hastags.value.split(' ');
  var sumValidation = {
    haveHashtags: true,
    onlyHashtag: false,
    noSpace: false,
    repHas: false,
    regExp: false,
    tooLong: false
  };

  for (var i = 0; i < hashtagsElements.length; i++) {
    if (hashtagsElements[i][0] !== '#') {
      sumValidation.haveHashtags = false;
    }

    if (hashtagsElements[i] === '#') {
      sumValidation.onlyHashtag = true;
    }

    if (hashtagsElements[i].length > 20) {
      sumValidation.tooLong = true;
    }

    for (var j = 1; j < hashtagsElements[i].length; j++) {
      if (hashtagsElements[i][j] === '#') {
        sumValidation.noSpace = true;
      }
    }

    for (var k = i + 1; k < hashtagsElements.length; k++) {
      if (hashtagsElements[i].toLowerCase() === hashtagsElements[k].toLowerCase()) {
        sumValidation.repHas = true;
      }
    }

  }

  if (!sumValidation.haveHashtags) {
    invalText.push('Хэштэги должны начинаться с #');
  }
  if (sumValidation.onlyHashtag) {
    invalText.push('Хэштэги не могут состоять только из #');
  }

  if (sumValidation.noSpace) {
    invalText.push('Хэштэги должны быть разделены пробелами');
  }

  if (hashtagsElements.length > 5) {
    invalText.push('Нельзя указывать больше пяти хэш-тегов');
  }

  if (sumValidation.tooLong) {
    invalText.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  }

  if (sumValidation.repHas) {
    invalText.push('Нельзя использовать повторяющиеся хэштэги');
  }

  if (REG_EXP.test(hastags.value)) {
    invalText.push('Нельзя использовать спецсимволы');
  }

  if (invalText.length !== 0) {
    return invalText.join('. \n');
  } else {
    return '';
  }
};

uploadHashtags.addEventListener('input', function (evt) {
  var target = evt.target;
  if (checkingValidationHastags(uploadHashtags) !== '') {
    target.setCustomValidity(checkingValidationHastags(uploadHashtags));
  } else {
    target.setCustomValidity('');
  }
});

