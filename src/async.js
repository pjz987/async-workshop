// Async Utilities

function parallel (tasks, callback) {
  const results = []
  // let counter = 1

  for(let i=0; i< tasks.length; i++) {
    const task = tasks[i]
    console.log(task)
    
    task((err, value) => {
      if (err) {
        callback(err, results)
      }
      results[i] = value
      let resultsFilled = true
      for (let j=0; j<tasks.length; j++) {
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
function map (collection, iteratee, callback) {
  const tasks = []
  for (let i=0; i<collection.length; i++) {
    tasks[i] = iteratee(collection[i])
    console.log(tasks[i])
  }
  // console.log(tasks)
  parallel(tasks, callback)

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
}

function waterfall (tasks, callback) {

}

export default {
  waterfall,
  parallel,
  map
}
