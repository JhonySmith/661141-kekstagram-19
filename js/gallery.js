'use strict';

(function () {
  var DELAY_TIME = 500;
  var RANDOM_PHOTO_NUMBER = 10;

  var picturesBlock = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photoFilters = document.querySelector('.img-filters');
  var lastTimeout;

  var filterButtons = {
    default: document.querySelector('#filter-default'),
    random: document.querySelector('#filter-random'),
    discussed: document.querySelector('#filter-discussed')
  };

  var clearAllPhotos = function () {
    var allPictures = document.querySelectorAll('.picture');
    allPictures.forEach(function (el) {
      el.remove();
    });
  };

  var setDelayLoad = function (loadTarget) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      clearAllPhotos();
      window.backend.load(loadTarget);
    }, DELAY_TIME);
  };

  var onDefaultButton = function () {
    setDelayLoad(onSuccess);
  };

  var getRandomPhotos = function (forRandomArr) {
    var arrRandom = window.data.shuffle(forRandomArr);
    arrRandom.splice(RANDOM_PHOTO_NUMBER, forRandomArr.length - RANDOM_PHOTO_NUMBER);
    photoRender(arrRandom);
  };

  var onRandomButton = function () {
    setDelayLoad(getRandomPhotos);
  };

  var getDiscussedPhotos = function (forDiscussedArr) {
    var discussedArr = forDiscussedArr.slice();
    discussedArr.sort(function (left, right) {
      if (left.comments.length < right.comments.length) {
        return 1;
      } else if (left.comments.length > right.comments.length) {
        return -1;
      }
      return 0;

    });
    photoRender(discussedArr);
  };

  var onDiscussedButton = function () {
    setDelayLoad(getDiscussedPhotos);
  };

  var photoRender = function (renderArr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < renderArr.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = renderArr[i].url;
      photoElement.querySelector('.picture__likes').textContent =
        renderArr[i].likes;
      photoElement.querySelector('.picture__comments').textContent =
        renderArr[i].comments.length;

      fragment.appendChild(photoElement);
    }

    picturesBlock.appendChild(fragment);

    var mainPictures = document.querySelectorAll('.picture');
    window.preview.onGalleryPhoto(mainPictures, renderArr);
  };

  var onSuccess = function (photo) {
    photoRender(photo);
    photoFilters.classList.remove('img-filters--inactive');
  };

  window.backend.load(onSuccess);

  filterButtons.default.addEventListener('click', onDefaultButton);
  filterButtons.random.addEventListener('click', onRandomButton);
  filterButtons.discussed.addEventListener('click', onDiscussedButton);
}());
