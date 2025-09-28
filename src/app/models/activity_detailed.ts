import { ActivityType } from "./activity_type";
import { User } from "./user";

export interface ActivityDetailed {
    id: bigint;
    ownerDTO: User;
    activityTypeDTO: ActivityType;
    competitionId?: bigint;
    name: string;
    category: string;
    description: string;
    activityDate: string;
    deadlineDate: string;
    startTime: string;
    endTime: string;
    activityStatus: string;
    participantDTOs: User[];
}