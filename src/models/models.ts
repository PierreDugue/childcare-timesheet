export type User = {
  userId: string;
  userName: string;
  userEmailAddress: string;
  token: string;
  config: [];
};

export type Family = {
  familyId: string;
  userId: string;
  name: string;
  logs: FamilyLogs[];
};

export type FamilyLogs = {
  date: Date;
  startHour: string;
  endHour: string;
  comment: string;
  signature: string;
};

export type LogFormInputs = {
  family: string;
  logs: FamilyLogs;
  comment: string;
  signature: string;
};

export type FamilyFormInputs = {
  familyId: string;
  name: string;
};
