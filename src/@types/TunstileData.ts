interface PersonData {
    name: string;
    time: string;
    isEntry: boolean;
    isNewEntry: boolean;
    isOnLeave: boolean;
    status: string;
}

interface TurnstileData {
    [regNo: string]: PersonData;
}
