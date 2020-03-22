'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var MAX_SCALE = 100;
  var MIN_SCALE = 25;
  var SCALE_STEP = 25;

  var uploadFile = document.querySelector('#upload-file');
  var photoEditForm = document.querySelector('.img-upload__overlay');
  var miniPhotos = document.querySelectorAll('.effects__preview');
  var scale = {
    caption: document.querySelector('.scale__control--value'),
    biggerButton: document.querySelector('.scale__control--bigger'),
    smallerButton: document.querySelector('.scale__control--smaller')
  };
  var mainSection = document.querySelector('main');

  var photoEditFormElements = {
    close: photoEditForm.querySelector('.img-upload__cancel'),
    effectLevel: photoEditForm.querySelector('.effect-level'),
    form: document.querySelector('.img-upload__form'),
    effectLevelPin: photoEditForm.querySelector('.effect-level__pin'),
    imgUploadPreview: photoEditForm.querySelector('.img-upload__preview img'),
    effectLevelDepth: photoEditForm.querySelector('.effect-level__depth'),
    effectLevelLine: photoEditForm.querySelector('.effect-level__line'),
    hashtags: photoEditForm.querySelector('.text__hashtags'),
    comment: photoEditForm.querySelector('.text__description')
  };

  var onPhotoEditorEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closePhotoEditor();
    }
  };

  var openPhotoEditor = function () {
    loadFile();

    scale.caption.value = '100%';
    photoEditFormElements.imgUploadPreview.style.transform = 'none';
    photoEditForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPhotoEditorEscPress);
    scale.biggerButton.addEventListener('click', onBiggerButton);
    scale.smallerButton.addEventListener('click', onLessButton);
    makeEffect();
  };

  var loadFile = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      var onLoadFile = function () {
        photoEditFormElements.imgUploadPreview.src = reader.result;
        miniPhotos.forEach(function (el) {
          el.style.backgroundImage = 'url(' + reader.result + ')';
        });
      };

      reader.addEventListener('load', onLoadFile);
      reader.readAsDataURL(file);
    }
  };

  var rescalePhoto = function (scaleCaption) {
    if (scaleCaption !== MAX_SCALE) {
      photoEditFormElements.imgUploadPreview.style.transform = 'scale(0.' + scaleCaption + ')';
    } else {
      photoEditFormElements.imgUploadPreview.style.transform = 'none';
    }
  };

  var onBiggerButton = function () {
    var currentScaleCaption = parseInt(scale.caption.value, 10);
    if (currentScaleCaption < MAX_SCALE) {
      currentScaleCaption = currentScaleCaption + SCALE_STEP;
      rescalePhoto(currentScaleCaption);
      scale.caption.value = currentScaleCaption + '%';
    }
  };

  var onLessButton = function () {
    var currentScaleCaption = parseInt(scale.caption.value, 10);
    if (currentScaleCaption > MIN_SCALE) {
      currentScaleCaption = currentScaleCaption - SCALE_STEP;
      rescalePhoto(currentScaleCaption);
      scale.caption.value = currentScaleCaption + '%';
    }
  };

  // Закрытие формы
  var closePhotoEditor = function () {
    photoEditForm.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');

    // Удаление слушателей событий на форме
    document.removeEventListener('keydown', onPhotoEditorEscPress);
    scale.biggerButton.removeEventListener('click', onBiggerButton);
    scale.smallerButton.removeEventListener('click', onLessButton);
    effectsList.forEach(function (el) {
      el.removeEventListener('click', makeEffect);
    });

    uploadFile.value = null;
  };

  uploadFile.addEventListener('change', openPhotoEditor);
  photoEditFormElements.close.addEventListener('click', closePhotoEditor);

  photoEditFormElements.hashtags.addEventListener('input', function (evt) {
    var target = evt.target;
    if (window.validation.checkingValidationHashtags(photoEditFormElements.hashtags) !== '') {
      target.setCustomValidity(window.validation.checkingValidationHashtags(photoEditFormElements.hashtags));
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

  photoEditFormElements.hashtags.addEventListener('focus', onFocusField);
  photoEditFormElements.hashtags.addEventListener('blur', onBlurField);
  photoEditFormElements.comment.addEventListener('focus', onFocusField);
  photoEditFormElements.comment.addEventListener('blur', onBlurField);

  var effectsList = document.querySelectorAll('input[name=effect]');
  var effectLevel = document.querySelector('.img-upload__effect-level');

  var effects = {
    'none': {
      name: 'none',
      className: '',
      filterName: 'none'
    },
    'chrome': {
      name: 'chrome',
      className: 'effects__preview--chrome',
      filterName: 'grayscale',
      valueMin: 0,
      valueMax: 1,
      unit: '',
    },
    'sepia': {
      className: 'effects__preview--sepia',
      filterName: 'sepia',
      valueMin: 0,
      name: 'sepia',
      valueMax: 1,
      unit: ''
    },
    'marvin': {
      name: 'marvin',
      className: 'effects__preview--marvin',
      filterName: 'invert',
      valueMin: 0,
      valueMax: 100,
      unit: '%'
    },
    'phobos': {
      name: 'phobos',
      className: 'effects__preview--phobos',
      filterName: 'blur',
      valueMin: 0,
      valueMax: 3,
      unit: 'px'
    },
    'heat': {
      name: 'heat',
      className: 'effects__preview--heat',
      filterName: 'brightness',
      valueMin: 1,
      valueMax: 3,
      unit: ''
    }
  };

  var makeEffect = function () {
    var effectNumber = (Math.round(photoEditFormElements.effectLevelDepth.offsetWidth / photoEditFormElements.effectLevelLine.offsetWidth * 10)) / 10;

    switch (true) {
      case (effectsList[0].checked):
        effectLevel.style.visibility = 'hidden';
        photoEditFormElements.imgUploadPreview.style.filter = effects.none.filterName;
        break;
      case (effectsList[1].checked):
        effectLevel.style.visibility = 'visible';
        photoEditFormElements.imgUploadPreview.style.filter = effects.chrome.filterName + '(' + effectNumber + ')';
        break;
      case (effectsList[2].checked):
        effectLevel.style.visibility = 'visible';
        photoEditFormElements.imgUploadPreview.style.filter = effects.sepia.filterName + '(' + effectNumber + ')';
        break;
      case (effectsList[3].checked):
        effectLevel.style.visibility = 'visible';
        photoEditFormElements.imgUploadPreview.style.filter = effects.marvin.filterName + '(' + effectNumber * effects.marvin.valueMax + effects.marvin.unit + ')';
        break;
      case (effectsList[4].checked):
        effectLevel.style.visibility = 'visible';
        photoEditFormElements.imgUploadPreview.style.filter = effects.phobos.filterName + '(' + effectNumber * effects.phobos.valueMax + effects.phobos.unit + ')';
        break;
      case (effectsList[5].checked):
        effectLevel.style.visibility = 'visible';
        photoEditFormElements.imgUploadPreview.style.filter = effects.heat.filterName + '(' + effectNumber * effects.heat.valueMax + ')';
        break;
    }
  };

  var onEffectList = function () {
    photoEditFormElements.effectLevelPin.style.left = photoEditFormElements.effectLevelLine.offsetWidth + 'px';
    photoEditFormElements.effectLevelDepth.style.width = photoEditFormElements.effectLevelLine.offsetWidth + 'px';
    makeEffect();
  };

  effectsList.forEach(function (el) {
    el.addEventListener('click', onEffectList);
  });

  photoEditFormElements.effectLevelPin.addEventListener('mousedown', function (evt) {
    var startParams = {
      pinPose: evt.clientX
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        pinPose: startParams.pinPose - moveEvt.clientX
      };

      startParams = {
        pinPose: moveEvt.clientX
      };
      if (photoEditFormElements.effectLevelPin.offsetLeft - shift.pinPose >= 0 && photoEditFormElements.effectLevelPin.offsetLeft - shift.pinPose <= 453) {
        photoEditFormElements.effectLevelPin.style.left = (photoEditFormElements.effectLevelPin.offsetLeft - shift.pinPose) + 'px';
        photoEditFormElements.effectLevelDepth.style.width = photoEditFormElements.effectLevelPin.style.left;
        makeEffect();
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  var successSendTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorSendTemplate = document.querySelector('#error').content.querySelector('.error');

  var onSuccessMessageEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeSuccessMessage();
    }
  };

  var onErrorMessageEscPress = function (evt) {
    if (evt.key === ESC_KEY) {
      closeErrorMessage();
    }
  };

  var onSuccessMessageMissClick = function (evt) {
    if (evt.target !== document.querySelector('.success').querySelector('.success__inner')) {
      closeSuccessMessage();
    }
  };

  var onErrorMessageMissClick = function (evt) {
    if (evt.target !== document.querySelector('.error').querySelector('.error__inner')) {
      closeErrorMessage();
    }
  };

  var closeSuccessMessage = function () {
    document.removeEventListener('keydown', onSuccessMessageEscPress);
    document.removeEventListener('click', onSuccessMessageMissClick);
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.success').remove();
  };

  var closeErrorMessage = function () {
    document.removeEventListener('keydown', onErrorMessageEscPress);
    document.removeEventListener('click', onErrorMessageMissClick);
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('.error').remove();
  };


  var onSendSuccess = function () {
    var fragment = document.createDocumentFragment();
    var successElement = successSendTemplate.cloneNode(true);
    fragment.appendChild(successElement);
    mainSection.appendChild(fragment);

    document.addEventListener('keydown', onSuccessMessageEscPress);
    document.addEventListener('click', onSuccessMessageMissClick);
    photoEditForm.classList.add('hidden');

    var closeButton = document.querySelector('.success').querySelector('.success__button');
    closeButton.addEventListener('click', closeSuccessMessage);
  };

  var onSendError = function () {
    var fragment = document.createDocumentFragment();
    var errorElement = errorSendTemplate.cloneNode(true);
    fragment.appendChild(errorElement);
    mainSection.appendChild(fragment);

    document.addEventListener('keydown', onErrorMessageEscPress);
    document.addEventListener('click', onErrorMessageMissClick);
    photoEditForm.classList.add('hidden');

    var closeButton = document.querySelector('.error').querySelector('.error__button');
    closeButton.addEventListener('click', closeErrorMessage);
  };

  var onDataSend = function (evt) {
    window.backend.send(new FormData(photoEditFormElements.form), onSendSuccess, onSendError);
    photoEditFormElements.hashtags.value = '';
    photoEditFormElements.comment.value = '';
    effectsList[0].checked = true;
    photoEditFormElements.imgUploadPreview.style.transform = 'none';
    evt.preventDefault();
  };

  photoEditFormElements.form.addEventListener('submit', onDataSend);
}());
