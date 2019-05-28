import { Injectable } from '@angular/core';
import coef from './coef.json'
import idf_diag from './idf_diag.json'
import intercept from './intercept.json'
import labels_mapping from './labels_mapping.json'
import vocabulary from './vocabulary.json'
import { ClassifierTools } from './classifier-tools.js';

@Injectable({
  providedIn: 'root'
})
export class ClassifierService {

  private MAGIC_TOLERANCE = 0.00001;

  tools: ClassifierTools
  constructor() {
    this.tools = new ClassifierTools()
  }


  // Scores classes with the Logistic Regression formula
  private score_classes(transformed_subject, coef, intercept) {
    return this.tools.add(this.tools.multiply(coef, transformed_subject), intercept);
  }

  // Returns the index of the maximum score from a list of scores
  private get_max_score(scores) {
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
  classify(subject) {
    // Preprocessing
    const vectorized_subject = this.tools.vectorize_data(subject, vocabulary);
    const transformed_subject = this.tools.transform_data(vectorized_subject, idf_diag);

    // Actual prediction
    return labels_mapping[this.get_max_score(this.score_classes(transformed_subject, coef, intercept))];
  };


  displayJsonData() {
    console.log("[CLASSIFIER] Displaying json objects")
    console.log(coef)
    console.log(idf_diag)
    console.log(intercept)
    console.log(labels_mapping)
    console.log(vocabulary)
  }
}
