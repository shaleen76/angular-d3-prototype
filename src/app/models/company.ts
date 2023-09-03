export class Company {
    constructor() {}
    name?: string | null;
    url?: string | null;
    id: number;
    year?: number | null;
    month?: string | null;
    city?: string | null;
    state?: string | null;
    industry?: Array<string> | [];
}
