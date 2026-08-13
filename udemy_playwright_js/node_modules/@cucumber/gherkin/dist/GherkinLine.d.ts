import type { IGherkinLine, Item } from './IToken.js';
export default class GherkinLine implements IGherkinLine {
    readonly lineText: string;
    readonly lineNumber: number;
    trimmedLineText: string;
    isEmpty: boolean;
    readonly indent: number;
    column: number;
    text: string;
    constructor(lineText: string, lineNumber: number);
    startsWith(prefix: string): boolean;
    startsWithTitleKeyword(keyword: string): boolean;
    match(regexp: RegExp): RegExpMatchArray;
    getLineText(indentToRemove: number): string;
    getRestTrimmed(length: number): string;
    getTableCells(): readonly Item[];
}
