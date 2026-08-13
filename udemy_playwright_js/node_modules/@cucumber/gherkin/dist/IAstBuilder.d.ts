import type { Comment, IdGenerator, Location, TableCell, TableRow, Tag } from '@cucumber/messages';
import type IToken from './IToken.js';
export interface IAstBuilder<AstNode, TokenType, RuleType> {
    stack: AstNode[];
    comments: Comment[];
    newId: IdGenerator.NewId;
    reset(): void;
    startRule(ruleType: RuleType): void;
    endRule(): void;
    build(token: IToken<TokenType>): void;
    getResult(): any;
    currentNode(): any;
    getLocation(token: IToken<TokenType>, column?: number): Location;
    getTags(node: AstNode): readonly Tag[];
    getCells(tableRowToken: IToken<TokenType>): readonly TableCell[];
    getDescription(node: AstNode): any;
    getSteps(node: AstNode): any[];
    getTableRows(node: AstNode): readonly TableRow[] | undefined;
    ensureCellCount(rows: readonly TableRow[]): void;
    transformNode(node: AstNode): any;
}
