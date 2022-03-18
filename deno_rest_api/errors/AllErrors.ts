// this file re-export all custom made error types
import * as CustomErrors from './CustomErrors.ts';
import * as DataErrors from './DataErrors.ts';

export const AllErrors = {CustomErrors, DataErrors};