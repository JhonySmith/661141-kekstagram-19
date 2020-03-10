'use strict';

(function () {
  var PHOTOS_NUMBER = 25;

  var photos = [];

  var picturesBlock = document.querySelector('.pictures');

  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

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

  window.data.photoGenerator(photos, PHOTOS_NUMBER);
  renderPhotos(photos);

  window.gallery = {
    photos: photos
  };
}());
