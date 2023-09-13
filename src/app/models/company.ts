export class Company {
    constructor() {}
    index: number;
    id: string;
    name?: string | null;
    score?: string|null;
    website?: string | null;
    revenue: string | null;
    totalEmployees?: number | 0;
    fundingDateStage?: number | null;
    location?: string | null;
    firstIndustry?: string | null;
    remainingIndustry?: string | null;
    remainingIndustryTooltip: string | null;
    industry: Array<string> | null;
}
