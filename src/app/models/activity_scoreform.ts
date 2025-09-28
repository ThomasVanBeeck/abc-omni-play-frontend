import { ActivityType } from "./activity_type";
import { User } from "./user";

export interface ActivityScoreForm {
    id: bigint;
    name: string;
    hasRanking: boolean;
    teamsPerActivity: number
    participantDTOs: User[];
}