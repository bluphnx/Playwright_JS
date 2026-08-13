import { GherkinException } from './Errors.js';
import type IToken from './IToken.js';
export declare class UnexpectedTokenException extends GherkinException {
    static create<TokenType>(token: IToken<TokenType>, expectedTokenTypes: string[]): GherkinException;
}
export declare class UnexpectedEOFException extends GherkinException {
    static create<TokenType>(token: IToken<TokenType>, expectedTokenTypes: string[]): GherkinException;
}
