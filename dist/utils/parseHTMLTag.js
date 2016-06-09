module.exports = function (string) {
  return string.slice(string.indexOf('<'), string.indexOf('>') + 1);
};