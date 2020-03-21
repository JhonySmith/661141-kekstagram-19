'use strict';

(function () {
  var shuffle = function (array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  var makeRandomUniqArr = function (uniqArr) {
    for (var i = 1; i <= uniqArr.length; i++) {
      uniqArr.push(i);
    }
    shuffle(uniqArr);
    return uniqArr;
  };

  window.data = {
    randomUniqArr: makeRandomUniqArr,
    shuffle: shuffle
  };
})();
