'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var photosArr;
  // Окно просмотра
  var previewWindow = document.querySelector('.big-picture');

  // Элементы окна просмотра
  var preview = {
    close: previewWindow.querySelector('.big-picture__cancel'),
    img: previewWindow.querySelector('img'),
    likes: previewWindow.querySelector('.likes-count'),
    socialCommentsCount: previewWindow.querySelector('.social__comment-count'),
    commentsLoader: previewWindow.querySelector('.comments-loader'),
    commentsList: previewWindow.querySelector('.social__comments'),
    commentItem: previewWindow.querySelector('.social__comment'),
    commentTextAdd: previewWindow.querySelector('.social__footer-text'),
    description: previewWindow.querySelector('.social__caption'),
    commentsCount: previewWindow.querySelector('.comments-count')
  };

  // Обработка нажатия ESC на окне просмотра - закрытие окна
  var onBigPictureEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeBigPicture();
    }
  };

  // Функция открытия окна
  var openBigPicture = function () {
    previewWindow.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureEscPress);
    commentsLoader.addEventListener('click', onCommentsLoader);
  };

  // Функция закрытия окна
  var closeBigPicture = function () {
    previewWindow.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.querySelector('body').classList.remove('modal-open');
    commentsNumber = 5;
    preview.commentsLoader.classList.remove('hidden');
    commentsLoader.removeEventListener('click', onCommentsLoader);
  };

  // Обработчик события - нажатие на крестик
  preview.close.addEventListener('click', closeBigPicture);

  // Отмена закрытия по ESC, если поле ввода комментария в фокусе
  var onFocusField = function () {
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  // Добавления закрытия по ESC, если поле ввода комментария не в фокусе
  var onBlurField = function () {
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  // Обработчики событий - фокуса/снятия фокуса поля ввода комментария
  preview.commentTextAdd.addEventListener('blur', onBlurField);
  preview.commentTextAdd.addEventListener('focus', onFocusField);

  var commentsNumber = 5;
  var commentsLoader = document.querySelector('.comments-loader');

  var onCommentsLoader = function () {
    commentsNumber = commentsNumber + 5;
    commentLoad(photosArr, commentsNumber);
  };

  var commentLoad = function (commentsFrom, number) {
    var fragment = document.createDocumentFragment();

    var lastCommentIndex = commentsFrom.comments.length;
    var actualEndIndex = Math.min(lastCommentIndex, number);

    if (actualEndIndex === lastCommentIndex) {
      preview.commentsLoader.classList.add('hidden');
    }

    for (var i = 0; i < actualEndIndex; i++) {
      var photoComment = preview.commentItem.cloneNode(true);
      preview.socialCommentsCount.textContent = actualEndIndex + ' из ' + lastCommentIndex + ' комментарев';

      photoComment.querySelector('.social__picture').src = commentsFrom.comments[i].avatar;
      photoComment.querySelector('.social__picture').alt = commentsFrom.comments[i].name;
      photoComment.querySelector('.social__text').textContent = commentsFrom.comments[i].message;
      fragment.appendChild(photoComment);
    }
    var photoCommentsList = preview.commentsList.querySelectorAll('.social__comment');
    photoCommentsList.forEach(function (el) {
      el.remove();
    }
    );
    preview.commentsList.appendChild(fragment);
  };

  // Функция добавления события на мини-фото галлереи и открытие окна просмотра
  var onGalleryPhoto = function (pictures, photos) {
    var previewPhotoLoader = function (photo) {
      photosArr = photo;
      preview.img.src = photo.url;
      preview.likes.textContent = photo.like;
      preview.description.textContent = photo.description;

      commentLoad(photo, commentsNumber);

      openBigPicture();
    };

    pictures.forEach(function (el, i) {
      el.addEventListener('click', function () {
        previewPhotoLoader(photos[i]);
        openBigPicture();
      });
      el.addEventListener('keydown', function (evt) {
        if (evt.key === ENTER_KEY) {
          previewPhotoLoader(photos[i]);
          openBigPicture();
        }
      });
    });
  };

  window.preview = {
    onGalleryPhoto: onGalleryPhoto
  };

}());
