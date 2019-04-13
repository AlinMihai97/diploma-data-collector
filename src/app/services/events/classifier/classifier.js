MAGIC_TOLERANCE = 0.00001;

// Access the functions from the other modules
const tools = require('./tools');

// Scores classes with the Logistic Regression formula
function score_classes(transformed_subject, coef, intercept) {
    return tools.add(tools.multiply(coef, transformed_subject), intercept);
}

// Returns the index of the maximum score from a list of scores
function get_max_score(scores) {
    let max = scores[0];
    let maxIndex = 0;

    for (let i = 1; i < scores.length; i++) {
        if (scores[i] > max) {
            maxIndex = i;
            max = scores[i];
        }
    }

    return maxIndex;
}

// Performs a prediction for a given subject
module.exports.classify = function classify(subject, vocabulary, idf_diag, labels_mapping, coef, intercept) {
    // Preprocessing
    const vectorized_subject = tools.vectorize_data(subject, vocabulary);
    const transformed_subject = tools.transform_data(vectorized_subject, idf_diag);

    // Actual prediction
    return labels_mapping[get_max_score(score_classes(transformed_subject, coef, intercept))];
};

// Performs a sanity check by computing the accuracy of the model and testing it against a known magic value :D
module.exports.sanity_check = function sanity_check(subjects, topics, expected_accuracy, vocabulary, idf_diag, labels_mapping,
                                             coef, intercept) {
    // Go through each subject and apply a prediction
    let accuracy = 0;
    for (let i = 0; i < subjects.length; i++) {
        const predicted_topic = exports.classify(subjects[i], vocabulary, idf_diag, labels_mapping, coef, intercept);
        const actual_topic = topics[i];

        if (predicted_topic === actual_topic) {
            accuracy++;
        }
    }

    accuracy = 100 * (accuracy / subjects.length);
    return Math.abs(accuracy - expected_accuracy) < MAGIC_TOLERANCE;
};

