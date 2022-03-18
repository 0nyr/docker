import * as CustomErrors from './CustomErrors.ts';

export class DuplicatedDataError extends CustomErrors.CustomError {}

export class DuplicatedUserError extends DuplicatedDataError {}