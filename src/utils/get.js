// returns an object's deeply nested property value, or undefined if nonexistant
//
// example:
//
// const obj = {
//  a: {
//    b: {
//      c: 'hello'
//    }
//  }
// }
//
// const prop = getNestedProperty(obj, ['a', 'b', 'c'])
// console.log(prop) // prints 'hello'
//
exports.getNestedProperty = (obj = {}, paths = []) =>
  paths.reduce((o, p) => (o || {})[p], obj)
