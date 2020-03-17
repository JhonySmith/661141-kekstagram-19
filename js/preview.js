'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  // Окно просмотра
  var previewWindow = document.querySelector('.big-picture');

  // Элементы окна просмотра
  var preview = {
    close: previewWindow.querySelector('.big-picture__cancel'),
    img: previewWindow.querySelector('img'),
    likes: previewWindow.querySelector('.likes-count'),
    commentsCount: previewWindow.querySelector('.social__comment-count'),
    commentsLoader: previewWindow.querySelector('.comments-loader'),
    commentsList: previewWindow.querySelector('.social__comments'),
    commentItem: previewWindow.querySelector('.social__comment'),
    commentTextAdd: previewWindow.querySelector('.social__footer-text')
  };

  preview.commentsCount.classList.add('hidden');
  preview.commentsLoader.classList.add('hidden');

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
  };

  // Функция закрытия окна
  var closeBigPicture = function () {
    previewWindow.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    document.querySelector('body').classList.remove('modal-open');
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

  // Функция добавления события на мини-фото галлереи и открытие окна просмотра
  var onGalleryPhoto = function (pictures, photos) {

    var previewPhotoLoader = function (photo) {
      var fragment = document.createDocumentFragment();

      preview.img.src = photo.url;
      preview.likes.textContent = photo.like;

      for (var i = 0; i < photo.comments.length; i++) {
        var photoComment = preview.commentItem.cloneNode(true);

        photoComment.querySelector('.social__picture').src = photo.comments[i].avatar;
        photoComment.querySelector('.social__picture').alt = photo.comments[i].name;
        photoComment.querySelector('.social__text').textContent = photo.comments[i].message;
        fragment.appendChild(photoComment);
      }
      var photoCommentsList = preview.commentsList.querySelectorAll('.social__comment');
      photoCommentsList.forEach(function (el) {
        el.remove();
      }
      );
      preview.commentsList.appendChild(fragment);

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
