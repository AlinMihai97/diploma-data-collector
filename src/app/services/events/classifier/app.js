// Access the functions from the other modules
const deserializer = require('./deserializer');
const classifier = require('./classifier');

const fs = require('fs')
// Initialization step (costy -- should be done once, eventually, when the app starts)
// [subjects, topics] = deserializer.fetch_test_data(); // just for sanity checks
// const accuracy = deserializer.fetch_accuracy(); // just for sanity checks



//const vocabulary = deserializer.fetch_vocabulary();
// const idf_diag = deserializer.fetch_idf_diag();
// const labels_mapping = deserializer.fetch_labels_mapping();
// const [coef, intercept] = deserializer.fetch_coefficients();
// var json_intercept = JSON.stringify(intercept);
// fs.writeFile('intercept.json', json_intercept, 'utf8', () => {})

// Checks implementation correctness (just run it once, before deployment -- it should yield true)
// In production, "data.csv" should not be included and this check should not be made (very costy)
//let result = classifier.sanity_check(subjects, topics, accuracy, vocabulary, idf_diag, labels_mapping, coef, intercept);
// console.log('Is sane: ' + result);

// Actual classification task (use it freely in production)
// result = classifier.classify('daily sprints', vocabulary, idf_diag, labels_mapping, coef, intercept);
// console.log('Sample prediction: ' + result);
