'use strict';

(function () {

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

  var onDefaultButton = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      clearAllPhotos();
      window.backend.load(successHandler);
    }, 500);
  };

  var getRandomPhotos = function (forRandomArr) {
    var arrRandom = window.data.shuffle(forRandomArr);
    arrRandom.splice(10, forRandomArr.length - 10);
    photoRender(arrRandom);
  };

  var onRandomButton = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      clearAllPhotos();
      window.backend.load(getRandomPhotos);
    }, 500);
  };

  var getDiscussedPhotos = function (forDiscussedArr) {
    var discussedArr = forDiscussedArr.slice();
    discussedArr.sort(function (left, right) {
      if (left.comments.length < right.comments.length) {
        return 1;
      } else if (left.comments.length > right.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    photoRender(discussedArr);
  };

  var onDiscussedButton = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      clearAllPhotos();
      window.backend.load(getDiscussedPhotos);
    }, 500);
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

  var successHandler = function (photo) {
    photoRender(photo);
    photoFilters.classList.remove('img-filters--inactive');
  };

  window.backend.load(successHandler);

  filterButtons.default.addEventListener('click', onDefaultButton);
  filterButtons.random.addEventListener('click', onRandomButton);
  filterButtons.discussed.addEventListener('click', onDiscussedButton);
}());
