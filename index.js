module.exports = function () {

  // Wrap a nested object to avoid a deepFreeze
  function antiFreeze(obj) {
    if (isNotObject(obj) || obj.isAntiFreeze) return obj;

    return {
      isAntiFreeze: true,
      toObject: function() { return obj; },
    };
  }

  // Recursively freeze an object and its nested objects
  function deepFreeze(obj) {
    if (isNotObject(obj)) return obj;

    if (obj.isAntiFreeze) {
      return obj.toObject();
    }

    // Loop through each property
    Object.getOwnPropertyNames(obj).forEach(function (name) {
      obj[name] = deepFreeze(obj[name]);
    });

    return Object.freeze(obj);
  }

  // Check if argument is not an object
  function isNotObject(obj) {
    return !isObject(obj);
  }

  // Check if argument is an object
  function isObject(obj) {
    return !!obj && typeof obj === 'object';
  }

  return {
    antiFreeze: antiFreeze,
    deepFreeze: deepFreeze,
  };

}();
