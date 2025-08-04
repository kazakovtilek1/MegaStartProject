export interface Booking {
  fullName: string;
  phone: string;
  country: string;
  email: string;
  participantsCount: number;
  hasMinors: "yes" | "no";
}
