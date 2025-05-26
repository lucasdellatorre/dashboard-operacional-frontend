export interface WebNode {
    id: string;
    group: number;
}

export interface WebLink {
    source: string;
    target: string;
    value: number;
}

export interface CreateWeb {
    operationId: number[];
    targetId: number[];
    suspectId: number[];
}

export interface WebResponse {
    nodes: WebNode[];
    links: WebLink[];
}
