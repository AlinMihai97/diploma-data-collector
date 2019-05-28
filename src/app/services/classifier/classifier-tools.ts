import * as MathJs from 'mathjs'
import * as Underscore from 'underscore'
export class ClassifierTools {
    // Checks whether a word is in the vocabulary and returns the index of the mapping
    private get_vocabulary_index(word, vocabulary) {

        for (let i = 0; i < vocabulary.length; i++) {
            if (word === vocabulary[i]['word']) {
                return i;
            }
        }
        return -1;
        
    }

    // Returns a bag of words for each passed subject
    private bag_of_words(subject, vocabulary) {
        // Tokenize the subject by words
        const words = subject.split(' ');

        // Will store 0s and 1s
        const _ = Underscore
        let resulting_bag = _.range(vocabulary.length).map(function () { return 0 });

        // Check if the word is present in the vocabulary
        for (let i = 0; i < words.length; i++) {
            const index = this.get_vocabulary_index(words[i], vocabulary);
            if (index !== -1) {
                resulting_bag[index]++;
            }
        }

        return resulting_bag
    }

    // Acts as a Count Vectorizer on the data
    vectorize_data(subject, vocabulary) {
        return this.bag_of_words(subject, vocabulary);
    };

    // Multiplies 2 matrices
    multiply(matrix1, matrix2) {
        // Perform faster math
        const mathjs = MathJs
        const m1 = mathjs.matrix(matrix1);
        const m2 = mathjs.matrix(matrix2);

        var result_matrix = mathjs.multiply(m1, m2) as MathJs.Matrix
        console.log(result_matrix.toArray())
        return result_matrix.toArray()
    };

    // Adds 2 matrices
    add(matrix1, matrix2) {
        // Perform faster math
        const mathjs = MathJs
        const m1 = mathjs.matrix(matrix1);
        const m2 = mathjs.matrix(matrix2);

        var result_matrix = mathjs.add(m1, m2) as MathJs.Matrix
        console.log(result_matrix.toArray())
        return result_matrix.toArray()
    };

    // Performs L2 normalization
    private normalize(row) {
        let s = 0;
        for (let i = 0; i < row.length; i++) {
            s += (row[i] * row[i])
        }

        // Nothing to normalize here
        if (s === 0) {
            return row;
        }

        s = Math.sqrt(s);
        for (let i = 0; i < row.length; i++) {
            row[i] = row[i] / s
        }

        return row
    }

    // Acts as a TF-IDF transformer on the data
    transform_data(vectorized_subject, idf_diag) {
        let transformed_data = this.multiply(vectorized_subject, idf_diag);
        transformed_data = this.normalize(transformed_data);

        return transformed_data;
    };
}
