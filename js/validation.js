'use strict';

(function () {
  var REG_EXP = /[$%&'*+/=?^_`{|}.,]/;

  var checkingValidationHastags = function (hastags) {
    var invalText = [];
    var hashtagsElements = hastags.value.trim().split(/\s/);
    var sumValidation = {
      haveHashtags: true,
      onlyHashtag: false,
      noSpace: false,
      repHas: false,
      regExp: false,
      tooLong: false
    };

    for (var i = 0; i < hashtagsElements.length; i++) {
      if (hashtagsElements[i][0] !== '#') {
        sumValidation.haveHashtags = false;
      }

      if (hashtagsElements[i] === '#') {
        sumValidation.onlyHashtag = true;
      }

      if (hashtagsElements[i].length > 20) {
        sumValidation.tooLong = true;
      }

      for (var j = 1; j < hashtagsElements[i].length; j++) {
        if (hashtagsElements[i][j] === '#') {
          sumValidation.noSpace = true;
        }
      }

      for (var k = i + 1; k < hashtagsElements.length; k++) {
        if (hashtagsElements[i].toLowerCase() === hashtagsElements[k].toLowerCase()) {
          sumValidation.repHas = true;
        }
      }

    }

    if (!sumValidation.haveHashtags) {
      invalText.push('Хэштэги должны начинаться с #');
    }
    if (sumValidation.onlyHashtag) {
      invalText.push('Хэштэги не могут состоять только из #');
    }

    if (sumValidation.noSpace) {
      invalText.push('Хэштэги должны быть разделены пробелами');
    }

    if (hashtagsElements.length > 5) {
      invalText.push('Нельзя указывать больше пяти хэш-тегов');
    }

    if (sumValidation.tooLong) {
      invalText.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    }

    if (sumValidation.repHas) {
      invalText.push('Нельзя использовать повторяющиеся хэштэги');
    }

    if (REG_EXP.test(hastags.value)) {
      invalText.push('Нельзя использовать спецсимволы');
    }

    if (invalText.length !== 0) {
      return invalText.join('. \n');
    } else {
      return '';
    }
  };

  window.validation = {
    checkingValidationHastags: checkingValidationHastags
  };
}());
