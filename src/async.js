// Async Utilities

function parallel(tasks, callback) {
  const results = []
  // let counter = 1

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]

    task((err, value) => {
      if (err) {
        callback(err, results)
      }
      results[i] = value
      let resultsFilled = true
      for (let j = 0; j < tasks.length; j++) {
        if (!results[j]) {
          resultsFilled = false
        }
      }
      if (resultsFilled) {
        callback(err, results)
      }
    })
  }
}

// Try to define map using parallel
function map(collection, iteratee, callback) {
  let counter = 0
  const results = []

  for (let i = 0; i < collection.length; i++) {
    iteratee(collection[i], (err, result) => {
      counter++
      results[i] = result

      if (err) {
        // console.log(err)
        callback(err, results)
      }
      if (counter === collection.length) {
        callback(err, results)
      }
    })
  }
}
// console.log(tasks?)
// parallel(tasks, callback)
// }

// function map (collection, iteratee, callback) {
//   const tasks = ???
//   parallel(tasks, callback)
// }
// const results = collection
// const tasks = []
// for(let i=0; i<collection.length; i++) {
//   tasks[i] = 
//   const x = collection[i]
//   iteratee(x, (err, result) => {
//     results[i] = result
//     callback(err, results)
//   })
// }

function waterfall(tasks, callback) {
  let counter = 0
  function doTask(index, ...args) {
    console.log(tasks[index])
    tasks[index](...args, (err, ...results) => {
      if (err) {
        console.log(err)
        callback(err, ...results)
      }
      counter++
      if (counter === tasks.length) {
        callback(err, ...results)
      } else if (counter <= tasks.length && !err) {
        doTask(counter, ...results)
      }
    })
  }
  doTask(counter)
}

export default {
  waterfall,
  parallel,
  map
}
