/**
 * Shuffles an array.
 *
 * @param {Array} array The array to shuffle.
 * @return {Array} The shuffled array.
 */
module.exports = function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element using array destructuring.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
