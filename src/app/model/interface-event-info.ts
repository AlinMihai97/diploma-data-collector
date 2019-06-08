import { PlatformIndependentEvent } from './platform-independent-model';
import { CalendarEvent } from './event';
import { Prediction } from './prediction';

export class InterfaceEventInfo {
    deviceEvent: PlatformIndependentEvent
    apiEvent: CalendarEvent
    prediction: {
        eventWithPrediction: boolean
        hasPrediction: boolean,
        value: number
    }
}
