import { PersonNode } from "./personNode";
import { PersonLink } from "./personLink";

export class Connection {
    constructor() {}
    nodes: Array<PersonNode> = new Array<PersonNode>;
    edges: Array<PersonLink> = new Array<PersonLink>;
}