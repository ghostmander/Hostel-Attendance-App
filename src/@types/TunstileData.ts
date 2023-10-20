interface PersonData {
    name: string;
    isEntry: boolean;
    blVal: "BHB1" | "BHB2" | "BHB3" | "GHB1" | ""
    isNewEntry: boolean;
    isOnLeave: boolean;
    status: string;
}

interface TurnstileData {
    [regNo: string]: PersonData;
}
