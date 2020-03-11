'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var mainPictures = document.querySelectorAll('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImg = bigPicture.querySelector('img');
  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  var bigPictureSocial = bigPicture.querySelector('.social__comment-count');
  bigPictureSocial.classList.add('hidden');
  var bigPictureCommentLoader = bigPicture.querySelector('.comments-loader');
  bigPictureCommentLoader.classList.add('hidden');

  var bigPhotoComments = document.querySelector('.social__comments');
  var bigPhotoCommentItem = bigPhotoComments.querySelector('.social__comment');

  var onBigPictureEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeBigPicture();
    }
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.querySelector('body').classList.remove('modal-open');
  };


  var renderBigPhotoComment = function (photoComment) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photoComment.length; i++) {
      var bigPhotoComment = bigPhotoCommentItem.cloneNode(true);

      bigPhotoComment.querySelector('.social__picture').src = photoComment[i].avatar;
      bigPhotoComment.querySelector('.social__picture').alt = photoComment[i].name;
      bigPhotoComment.querySelector('.social__text').textContent = photoComment[i].message;
      fragment.appendChild(bigPhotoComment);
    }
    var bigPhotoCommentItems = bigPhotoComments.querySelectorAll('.social__comment');
    bigPhotoCommentItems.forEach(function (el) {
      el.remove();
    }
    );
    bigPhotoComments.appendChild(fragment);
  };

  var bigPictureLoadData = function (elNumber) {
    openBigPicture();
    bigPictureImg.src = window.gallery.photos[elNumber].url;
    bigPictureLikes.textContent = window.gallery.photos[elNumber].likes;
    renderBigPhotoComment(window.gallery.photos[elNumber].comments);
  };

  mainPictures.forEach(function (el, i) {
    el.addEventListener('click', function () {
      bigPictureLoadData(i);
    });
    el.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        bigPictureLoadData(i);
      }
    });
  });

  bigPictureClose.addEventListener('click', function () {
    closeBigPicture();
  });

  var commentAddText = bigPicture.querySelector('.social__footer-text');

  commentAddText.addEventListener('blur', function () {
    document.addEventListener('keydown', onBigPictureEscPress);
  });

  commentAddText.addEventListener('focus', function () {
    document.removeEventListener('keydown', onBigPictureEscPress);
  });
}());
