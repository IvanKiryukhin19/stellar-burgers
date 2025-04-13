import { Action } from '@reduxjs/toolkit';

export interface RejectedAction extends Action {
  error: Error;
}

export const isRejectedAction = (action: Action): action is RejectedAction =>
  action.type.endsWith('rejected');

export const isPendingAction = (action: Action): boolean =>
  action.type.endsWith('pending');
