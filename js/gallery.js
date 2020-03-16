'use strict';

(function () {

  var picturesBlock = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var successHandler = function (photo) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photo.length; i++) {
      var photoElement = photoTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').src = photo[i].url;
      photoElement.querySelector('.picture__likes').textContent =
        photo[i].likes;
      photoElement.querySelector('.picture__comments').textContent =
        photo[i].comments.length;

      fragment.appendChild(photoElement);
    }

    picturesBlock.appendChild(fragment);

    var mainPictures = document.querySelectorAll('.picture');

    window.preview.onGalleryPhoto(mainPictures, photo);
  };

  window.backend.load(successHandler);
}());
