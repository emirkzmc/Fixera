export enum AuthApiMethod {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
  GET_ME = '/auth/me',
  UPDATE_PROFILE_PHOTO = '/auth/upload-profile-photo',
  DELETE_PROFILE_PHOTO = '/auth/profile-photo',
}

export enum CustomerApiMethod {
  GET_ALL = '/customers',
  CREATE = '/customers',
  GET_BY_ID = '/customers/:id',
  UPDATE = '/customers/:id',
}

export enum FinanceApiMethod {
  GET_SUMMARY = '/finances/summary',
  GET_PAYMENTS = '/finances/payments',
  CREATE_PAYMENT = '/finances/payments',
  UPDATE_PAYMENT = '/finances/payments/:id',
}

export enum InventoryApiMethod {
  GET_ALL = '/inventory',
  CREATE = '/inventory',
  UPDATE = '/inventory/:id',
  USE_FOR_JOB = '/inventory/use-for-job/:jobId',
}

export enum JobApiMethod {
  GET_ALL = '/jobs',
  CREATE = '/jobs',
  GET_BY_ID = '/jobs/:id',
  UPDATE = '/jobs/:id',
  DELETE = '/jobs/:id',
  TRACK = '/jobs/track/:trackingCode',
}

export enum WorkshopApiMethod {
  GET_PUBLIC = '/workshops/public/:id',
  GET_ME = '/workshops/me',
  UPDATE_ME = '/workshops/me',
}
