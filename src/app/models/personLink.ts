import { PersonNode } from "./personNode";

export class PersonLink {

    constructor() {}

    index: number;
    source: PersonNode;
    target: PersonNode;
    weight: number;
    relation: string;
}