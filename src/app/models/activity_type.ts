export interface ActivityType {
    id: bigint;
    name: string;
    minParticipants: number;
    maxParticipants: number;
    duration: number;
    hasRanking: boolean;
    teamsPerActivity?: number;
    isDeleted: boolean;
}