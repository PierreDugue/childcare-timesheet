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
  startDate: Date;
  endDate: Date;
  signature: string;
};

export type LogFormInputs = {
  family: string;
  logs: familyLogs[];
};
