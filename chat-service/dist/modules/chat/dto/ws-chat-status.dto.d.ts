export declare class WsChatStatusDto {
    last_message: Date | null;
    users: number;
    static fromInformation(currentMembers: number, lastMessage?: Date): WsChatStatusDto;
}
