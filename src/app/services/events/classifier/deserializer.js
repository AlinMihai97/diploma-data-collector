TEST_DATA_FILE = './resources/data.csv';
VOCABULARY_FILE = './resources/vocabulary.json';
IDF_DIAG_FILE = './resources/idf_diag.in';
LABELS_MAPPING_FILE = './resources/labels_mapping.json';
COEFFICIENTS_FILE = './resources/coefficients.json';
INTERCEPT_FILE = './resources/intercept.json';
ACCURACY_FILE = './resources/accuracy.in';


// Gets some sample test data from a csv file
exports.fetch_test_data = function fetch_test_data() {

    // Read from the csv file
    const fs = require('fs');
    const fileContent = fs.readFileSync(TEST_DATA_FILE).toString();

    // Will hold the extracted content
    let subjects = [];
    let topics = [];

    // For each csv entry, extract the subject and topic
    const lines = fileContent.split('\n');
    for (let i = 1; i < lines.length - 1; i++) {
        const tokens = lines[i].trim().split(',');
        const subject = tokens[0];
        const topic = tokens[1];

        subjects.push(subject);
        topics.push(topic);
    }

    return [subjects, topics];
};

// Comparison function for pretty sorting strings
function cmp(a, b) {
    // Case insensitive
    const nameA = a.word.toUpperCase();
    const nameB = b.word.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }

    if (nameA > nameB) {
        return 1;
    }

    return 0;
}

// Gets the vocabulary for the BOW transformations
exports.fetch_vocabulary = function fetch_vocabulary() {

    // Read from the json file
    const fs = require('fs');
    const fileContent = fs.readFileSync(VOCABULARY_FILE);

    // Save the parsed data as a dictionary
    let vocabulary = JSON.parse(fileContent.toString());

    // Convert the vocabulary to another format
    let mutated_vocabulary = [];
    for (let key in vocabulary) {
        if (vocabulary.hasOwnProperty(key)) {
            mutated_vocabulary.push({'word': key, 'encoding': vocabulary[key]})
        }
    }

    // Return it
    return mutated_vocabulary.sort(cmp);
};

// Gets the idf_diag for the TF-IDF transformations
exports.fetch_idf_diag = function fetch_idf_diag() {

    // Read from the file
    const fs = require('fs');
    const sparse_matrix = fs.readFileSync(IDF_DIAG_FILE).toString().split('\n');

    // Fetch the dimensions
    const dimensions = sparse_matrix[0].trim().split(',');
    const n = dimensions[0].trim().replace('(', '');
    const m = dimensions[1].trim().replace(')', '');

    // Create a zeroed dense matrix
    const _ = require("underscore");
    let dense_matrix = _.range(n).map(function () {
        // Create one row
        return _.range(m).map(function () {
            return 0;
        });
    });

    // Go through each sparse matrix line
    for (let k = 1; k < sparse_matrix.length; k++) {
        const tokens = sparse_matrix[k].split('\t');
        if (tokens.length < 2) {
            continue;
        }

        // Fetch the indices
        const indices = tokens[0].trim().split(',');
        const i = indices[0].trim().replace('(', '');
        const j = indices[1].trim().replace(')', '');

        // Then fetch the value and write in the dense matrix
        dense_matrix[i][j] = tokens[1].trim();
    }

    return dense_matrix;
};

// Gets the labels mapping for the label encoding step
exports.fetch_labels_mapping = function fetch_labels_mapping() {
    // Read from the json file
    const fs = require('fs');
    const fileContent = fs.readFileSync(LABELS_MAPPING_FILE);

    // Returned the parsed data as a dictionary
    return JSON.parse(fileContent.toString());
};

// Gets the actual parameters of the serialized model
exports.fetch_coefficients = function fetch_coefficients() {
    // Read from the json files
    const fs = require('fs');
    const coefFileContent = fs.readFileSync(COEFFICIENTS_FILE);
    const interceptFileContent = fs.readFileSync(INTERCEPT_FILE);

    const coef = JSON.parse(coefFileContent.toString());
    const intercept = JSON.parse(interceptFileContent.toString());

    // Returned the parsed data as a dictionary
    return [coef, intercept]
};

// Gets the expected accuracy for the sanity check
exports.fetch_accuracy = function fetch_accuracy() {
    // Read the accuracy from file
    const fs = require('fs');
    return fs.readFileSync(ACCURACY_FILE);
};
