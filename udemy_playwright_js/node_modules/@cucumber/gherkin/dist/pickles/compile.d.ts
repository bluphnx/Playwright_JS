import { type GherkinDocument, type IdGenerator, type Pickle } from '@cucumber/messages';
export default function compile(gherkinDocument: GherkinDocument, uri: string, newId: IdGenerator.NewId): readonly Pickle[];
