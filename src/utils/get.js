// safely returns an object's deeply nested property value.
// if any path property doesn't exist, it returns undefined.
exports.get = (obj = {}, paths = []) =>
  paths.reduce((o, p) => (o || {})[p], obj)
