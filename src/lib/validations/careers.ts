import * as z from "zod/mini";

import { emailField, phoneField } from "./contact";

export const careerPositions = [
  "Technician",
  "Driver / Field Crew",
  "Front Office",
  "Back Office / Administration",
  "Management",
  "Other",
] as const;

const name = (label: string) =>
  z
    .string()
    .check(
      z.trim(),
      z.minLength(1, { error: `Please enter your ${label}.` }),
      z.maxLength(80, { error: `Your ${label} is too long.` }),
    );

export const careersSchema = z.object({
  firstName: name("first name"),
  lastName: name("last name"),
  phone: phoneField,
  email: emailField,
  position: z.enum(careerPositions, { error: "Please choose a position." }),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(20, { error: "Tell us a little more (at least 20 characters)." }),
      z.maxLength(3000, { error: "Please keep this under 3,000 characters." }),
    ),
});

export type CareersField = keyof z.infer<typeof careersSchema>;
