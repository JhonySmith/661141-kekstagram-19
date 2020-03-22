'use strict';

(function () {
  var REG_EXP = /[$%&'*+/=?^_`{|}.,]/;

  var checkingValidationHashtags = function (hashtags) {
    var invalidText = [];
    var hashtagsElements = hashtags.value.trim().split(/\s/);
    var sumValidation = {
      haveHashtags: true,
      onlyHashtag: false,
      noSpace: false,
      repHas: false,
      regExp: false,
      tooLong: false
    };

    hashtagsElements.forEach(function (el, i) {
      if (el[0] !== '#') {
        sumValidation.haveHashtags = false;
      }

      if (el === '#') {
        sumValidation.onlyHashtag = true;
      }

      if (el.length > 20) {
        sumValidation.tooLong = true;
      }

      for (var j = 1; j < el.length; j++) {
        if (el[j] === '#') {
          sumValidation.noSpace = true;
        }
      }

      for (var k = i + 1; k < el.length; k++) {
        if (String(el).toLowerCase() === String(hashtagsElements[k]).toLowerCase()) {
          sumValidation.repHas = true;
        }
      }
    });

    if (!sumValidation.haveHashtags) {
      invalidText.push('Хэштэги должны начинаться с #');
    }
    if (sumValidation.onlyHashtag) {
      invalidText.push('Хэштэги не могут состоять только из #');
    }

    if (sumValidation.noSpace) {
      invalidText.push('Хэштэги должны быть разделены пробелами');
    }

    if (hashtagsElements.length > 5) {
      invalidText.push('Нельзя указывать больше пяти хэш-тегов');
    }

    if (sumValidation.tooLong) {
      invalidText.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    }

    if (sumValidation.repHas) {
      invalidText.push('Нельзя использовать повторяющиеся хэштэги');
    }

    if (REG_EXP.test(hashtags.value)) {
      invalidText.push('Нельзя использовать спецсимволы');
    }

    var result = invalidText.length ? invalidText.join('. \n') : '';
    return result;

  };

  window.validation = {
    checkingValidationHashtags: checkingValidationHashtags
  };
}());
