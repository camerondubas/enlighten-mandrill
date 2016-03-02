'use strict';

class StringOperations {
  static toCamelCase(str) {
    let camelCase = str.split('_')
      .map(item => item[0].toUpperCase() + item.slice(1))
      .join('');

    return camelCase[0].toLowerCase() + camelCase.slice(1);

  }
};

module.exports = StringOperations;
