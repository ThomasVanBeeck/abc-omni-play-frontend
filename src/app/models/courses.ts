export interface FollowedCourse {
  followedCourseId: number;
  date: Date;
  course: Course;
}

export interface Course {
  courseId: number;
  name: string;
  description: string;
}
