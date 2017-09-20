export class ITalent
{
    name: string;
    picture: string;
    rating: number;
    id: string;
    groups: number[];
    selected: boolean;
}

export class IGroup {
    name: string;
    logo: string;    
    id: number;
    memberCount: number;
    selected: boolean;
}