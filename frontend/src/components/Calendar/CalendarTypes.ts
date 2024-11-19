export interface CalendarData {
  id: string;
  summary: string;
  location: string;
  start: {
    dateTime: string;
    date: string;
  };
}
