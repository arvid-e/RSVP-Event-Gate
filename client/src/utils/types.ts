export interface AnswerResponse {
  _id: string;
  name: string;
  email: string;
  password?: string;
  link?: string;
  date: string;
  eventId: string;
}

export interface FetchAnswersResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    answers: AnswerResponse[];
  };
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  link?: string;
  date: string;
}