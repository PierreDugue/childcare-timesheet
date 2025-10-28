export type User = {
  userId: string;
  userName: string;
  userEmailAddress: string;
  token: string;
  config: [];
};

export type family = {
  familyId: string;
  userId: string;
  name: string;
  logs: familyLogs[];
};

export type familyLogs = {
  date: Date;
  startHour: Date | null;
  endHour: Date | null;
  signature: string;
};

export type LogFormInputs = {
  family: string;
  logs: familyLogs;
  comment: string;
};

export type FamilyFormInputs = {
  familyId: string;
  name: string;
};
