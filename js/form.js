'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var uploadFile = document.querySelector('#upload-file');
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var photoEditorCloseButton = photoEditForm.querySelector('.img-upload__cancel');
  var effectLevelPin = photoEditForm.querySelector('.effect-level__pin');
  var imgUploadPreview = photoEditForm.querySelector('.img-upload__preview img');
  var effectLevelDepth = photoEditForm.querySelector('.effect-level__depth');
  var effectLevelLine = photoEditForm.querySelector('.effect-level__line');
  var uploadHashtags = photoEditForm.querySelector('.text__hashtags');
  var uploadComment = photoEditForm.querySelector('.text__description');

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

  uploadFile.addEventListener('change', openPhotoEditor);
  photoEditorCloseButton.addEventListener('click', closePhotoEditor);

  var effectChrome = photoEditForm.querySelector('.effects__preview--chrome');

  effectChrome.addEventListener('click', function () {
    imgUploadPreview.style.filter = 'grayscale(0.9)';

    effectLevelPin.addEventListener('mouseup', function () {
      var wdd = (Math.round(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 10)) / 10;
      imgUploadPreview.style.filter = 'grayscale(' + wdd + ')';
    });

  });

  uploadHashtags.addEventListener('input', function (evt) {
    var target = evt.target;
    if (window.validation.checkingValidationHastags(uploadHashtags) !== '') {
      target.setCustomValidity(window.validation.checkingValidationHastags(uploadHashtags));
    } else {
      target.setCustomValidity('');
    }
  });

  var onFocusField = function () {
    document.removeEventListener('keydown', onPhotoEditorEscPress);
  };

  var onBlurField = function () {
    document.addEventListener('keydown', onPhotoEditorEscPress);
  };

  uploadComment.addEventListener('focus', onFocusField);
  uploadComment.addEventListener('blur', onBlurField);

}());
