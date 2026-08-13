import type { Location } from '@cucumber/messages';
export declare class GherkinException extends Error {
    errors: Error[];
    location: Location;
    constructor(message: string);
    protected static _create(message: string, location?: Location): GherkinException;
}
export declare class ParserException extends GherkinException {
    static create(message: string, line: number, column: number): ParserException;
}
export declare class CompositeParserException extends GherkinException {
    static create(errors: Error[]): CompositeParserException;
}
export declare class AstBuilderException extends GherkinException {
    static create(message: string, location: Location): GherkinException;
}
export declare class NoSuchLanguageException extends GherkinException {
    static create(language: string, location?: Location): GherkinException;
}
