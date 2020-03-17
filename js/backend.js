'use strict';

(function () {
  var URL = {
    LOAD: 'https://js.dump.academy/kekstagram/data'
  };
  var statusCode = {
    OK: 200
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.open('GET', URL.LOAD);
    xhr.send();
  };

  window.backend = {
    load: load
  };
}());
