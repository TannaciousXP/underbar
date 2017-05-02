(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array.shift() : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
      if (n > array.length) {
        return array;
      }
    return n === undefined ? array.pop() : array.slice(array.length - n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function(collection, iterator) {
      if (Array.isArray(collection)) {
          for (var i = 0; i < collection.length; i++) {
              iterator(collection[i], i, collection);
          }
      } else {
          for (var key in collection) {
              iterator(collection[key], key, collection);
          }
      }

  };


  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
      return _.reduce(collection, function(filterArr, value) {
          if (test(value)) {
              filterArr.push(value);
          }
          return filterArr;
      }, []);
  };


  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
      return _.reduce(collection, function(rejectArr, ele) {
          if (!test(ele)) {
              rejectArr.push(ele);
          }

          return rejectArr;
      }, []);
  };


  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
       var uniq = {};
       return _.reduce(array, function(uniqArr, ele) {
           if (!uniq.hasOwnProperty(ele)) {
               uniq[ele] = true;
               uniqArr.push(ele);
           }
           return uniqArr;
       }, []);
  };



  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
      return _.reduce(collection, function(mappedArr, ele) {
          mappedArr.push(iterator(ele));
          return mappedArr;
      }, []);
  };


  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
      // TIP: map is really handy when you want to transform an array of
      // values into a new array of values. _.pluck() is solved for you
      // as an example of this.
      return _.map(collection, function(value) {
          return value[key];
      });
  };


  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
      var hasNoAccum = arguments.length < 3;
      _.each(collection, function(ele, idx, collection) {
          if (hasNoAccum) {
              accumulator = ele;
              hasNoAccum = false;
          } else {
              accumulator = iterator(accumulator, ele, idx, collection);
          }
      });
      return accumulator;
  };



  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
      // TIP: Many iteration problems can be most easily expressed in
      // terms of reduce(). Here's a freebie to demonstrate!
      return _.reduce(collection, function(wasFound, ele) {
          if (ele === target) {
              return true;
          } else {
              return wasFound;
          }
      }, false);
  };



  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
      // TIP: Try re-using reduce() here.
      var check = iterator || _.identity;
      return _.reduce(collection, function(prev, next) {
          return prev && !!check(next);
      }, true);
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one


  // _.some = function(collection, iterator) {
  //   if (iterator === undefined) {
  //     iterator = function(item){
  //       return item;
  //     };
  //   }
  //   // TIP: There's a very clever way to re-use every() here.
  //   return !_.every(collection, function(item) {
  //     if (!iterator(item)) {
  //       return true;
  //     }
  //   });
  // };

  _.some = function(collection, iterator) {
      // TIP: There's a very clever way to re-use every() here.
      var check = iterator || _.identity;

      return !_.every(collection, function(ele) {
          if (!check(ele)) {
              return true;
          }
      });
  };


  //   var check = iterator || _.identity;

  //   if (collection.length === 0) {
  //     return false;
  //   }

  //   for (var i = 0; i < collection.length; i++) {
  //     if (check(collection[i])) {
  //       return  true;
  //     }
  //   }
  //   return false;
  // };



  // *
  //  * OBJECTS
  //  * =======
  //  *
  //  * In this section, we'll look at a couple of helpers for merging objects.


  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function() {
      var args = [].slice.call(arguments);
      var mainObj = args[0];
      _.each(args, function(obj) {
          for (var key in obj) {
              mainObj[key] = obj[key];
          }
      });
      return mainObj;
  };


  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function() {
      var args = [].slice.call(arguments);
      var mainObj = args[0];
      _.each(args, function(obj) {
          for (var key in obj) {
              if (!mainObj.hasOwnProperty(key)) {
                  mainObj[key] = obj[key];
              }
          }
      });
      return mainObj;
  };



  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.


  _.memoize = function(func) {
      var cache = {};
      return function() {
          var args = [].slice.call(arguments);
          var key = JSON.stringify(args);
          if (!cache.hasOwnProperty(key)) {
              cache[key] = func.apply(this, args);
          }
          return cache[key];
      };
  };




  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
      var params = [].slice.call(arguments).slice(2);
      var fun = function() {
          return func.apply(this, params); };
      return setTimeout(fun, wait);
  };



  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.

_.invoke = function(collection, functionOrKey, args) {
    if (typeof functionOrKey === 'string') {
        return _.map(collection, function(ele) {
        return ele[functionOrKey](args);
      });
    } else {
        return _.map(collection, function(ele) {
        return functionOrKey.apply(ele, args);
      });
    }
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    return collection.sort(function(x, y) {
        if (typeof iterator === 'string') {
          return x[iterator] - y[iterator];
        } else {
           return iterator(x) - iterator(y);
        }
    });
  };

   // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
      //   var numbers = [1,2,3];
      //   var sum = _.reduce(numbers, function(total, number){
      //     return total + number;
      //   }, 0); // should be 6
      //
      //   var identity = _.reduce([5], function(total, number){
      //     return total + number * number;
      //   }); // should be 5, regardless of the iterator function passed in
      //          No accumulator is given so the first element is used.

      // return _.reduce(nestedArray, function(arr, nestedArr) {
      //     if (!Array.isArray(nestedArr)) {
      //         arr.push(nestedArr);
      //     } else {
      //         _.each(nestedArr, function(ele) {
      //             arr.push(ele);
      //         });
      //     }

      //     return arr;
      // }, []);
      var outputArr = [];

      var pushEle = function (array) {
        _.each(array, function(ele) {
            if (typeof ele === 'number') {
          outputArr.push(ele); 
         } else {
            pushEle(ele);
         }
        });
      };
      pushEle(nestedArray);
      return outputArr;
  };


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // get all the arguments
    // find out with one is the longest
    // write a for loop for that 
    var zipped = [];
    var longest = [].sort.call(arguments, function(x, y) {
      return y.length - x.length;
    })[0];

    for (var i = 0; i < longest.length; i++) {
      zipped[i] = _.pluck(arguments, i);
    }

    return zipped;
  };

 

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var shared = [];
    var args = [].slice.call(arguments); //<- arrays we should loop through
    _.each(args[0], function(item){
      var isShared = false;
      for (var i = 1; i < args.length; i++) {
        _.each(args[i], function(ele){
          if (item === ele) {
            isShared = true;
          }
        });
      }
      if (isShared) {
        shared.push(item);
      }

    });
 
    return shared;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var uniq = [];
    var args = [].slice.call(arguments);
    _.each(args[0], function(item) {
      var isUniq = true;
      for (var i = 1; i < args.length; i++) {
        _.each(args[i], function(ele) {
          if (item === ele) {
            isUniq = false;
          }
        });
         }
         if (isUniq) {
          uniq.push(item);
      }
    });
    return uniq;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
