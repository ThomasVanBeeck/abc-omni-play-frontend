import { Activity } from "./activity";
import { User } from "./user";

export interface Score {
    id: bigint;
    userId: User;
    activityId: Activity;
    result: string;
    xpEarned: number;
    scoreDate: string;
  }