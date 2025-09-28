import { User } from "./user";

export interface Activity {
 id: bigint;
 ownerId: bigint;
 activityTypeId: bigint;
 competitionId?: bigint;
 name: string;
 category: string;
 description: string;
 activityDate: string;
 startTime: string;
 endTime: string;
 deadlineDate: string;
 status: string;
}