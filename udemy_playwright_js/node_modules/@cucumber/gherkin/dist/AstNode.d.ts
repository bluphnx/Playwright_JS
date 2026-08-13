import type IToken from './IToken.js';
import type { RuleType, TokenType } from './Parser.js';
export default class AstNode {
    readonly ruleType: RuleType;
    private readonly subItems;
    constructor(ruleType: RuleType);
    add(type: any, obj: any): void;
    getSingle(ruleType: RuleType): any;
    getItems(ruleType: RuleType): any[];
    getToken(tokenType: TokenType): any;
    getTokens(tokenType: TokenType): IToken<TokenType>[];
}
