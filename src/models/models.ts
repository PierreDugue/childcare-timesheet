import z from "zod";

export type User = {
  userName: string;
  userEmailAddress: string;
  token: string;
  config: [];
};

export type Family = {
  familyId: string;
  name: string;
  logs: FamilyLogs[];
};

export type FamilyLogs = {
  id?: number;
  date: Date;
  startHour: string;
  endHour: string;
  comment: string;
  signature: string;
};

export const newLogSchema = z.object({
  family: z.string().nonempty("Family is required") || z.undefined(),
  logs: z.object({
    date: z.string().nonempty("Date is required"),
    startHour: z.string().optional() || z.undefined(),
    endHour: z.string().optional() || z.undefined(),
    comment: z.string().optional() || z.undefined(),
    signature: z.string().optional() || z.undefined(),
  }),
});

export type LogFormInputs = z.infer<typeof newLogSchema>;
export type LogFormOutputs = z.infer<typeof newLogSchema>;

export type FamilyFormInputs = {
  familyId: string;
  name: string;
};

export type Credentials = {
  username: string;
  password: string;
  email?: string;
}