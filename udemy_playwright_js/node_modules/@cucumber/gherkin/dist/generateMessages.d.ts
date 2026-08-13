import { type Envelope, SourceMediaType } from '@cucumber/messages';
import type IGherkinOptions from './IGherkinOptions.js';
export default function generateMessages(data: string, uri: string, mediaType: SourceMediaType, options: IGherkinOptions): readonly Envelope[];
