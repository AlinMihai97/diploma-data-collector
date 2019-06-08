export class Prediction {
    prediction_list: {
        event_id: string
        heart_rate_delta: number
    }[] = []
    confidence_score: number = 0
    ETA: number = 0
}

