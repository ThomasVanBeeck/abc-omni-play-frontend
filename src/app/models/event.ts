export interface Event {
  id: number;
  title: string;
  imageUrl: string;
  content: string;
  techSessionUrl: string;
  createDate: Date;
  eventTimeUpdated: boolean;
  commentCount: number;
  comments: Comment[];
  startDate: Date;
  endDate: Date;
  location: string;
  subscriptionDeadline: Date;
  subscriptionNotRequired: boolean;
  eventColor: string;
}

export interface Comment {
  id: number;
  content: string;
  createdOn: Date;
  user: number;
  children: Comment[];
}

