

 npm i -D cypressjsonresults

// cypress/plugins/index.js
module.exports = (on, config) => {
  require('cypressjsonresults')({
    on,
    filename: 'results.json', // provide name of json file
  })
}