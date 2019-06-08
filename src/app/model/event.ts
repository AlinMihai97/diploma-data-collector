export class CalendarEvent {
    event_id: string;
    is_organizer: boolean;
    topic: string;
    start_time: number;
    end_time: number;
    location: string;
    participants:
        {
            participant_id: string;
            is_present: boolean;
            is_organizer: boolean;
        }[]
}
