// zod/mini keeps the client bundle small: this schema ships to the browser with the form.
import * as z from "zod/mini";

import { requestableServices } from "@/content/service-types";

const phonePattern = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const required = (label: string, max = 120) =>
  z
    .string()
    .check(
      z.trim(),
      z.minLength(1, { error: `Please enter ${label}.` }),
      z.maxLength(max, { error: `${label[0]?.toUpperCase()}${label.slice(1)} is too long.` }),
    );

const optionalText = (max: number, error: string) =>
  z.optional(z.string().check(z.trim(), z.maxLength(max, { error })));

export const phoneField = z
  .string()
  .check(z.trim(), z.regex(phonePattern, { error: "Please enter a 10-digit phone number." }));

export const emailField = z.pipe(
  z.string().check(z.trim(), z.maxLength(160, { error: "Email address is too long." })),
  z.email({ error: "Please enter a valid email address." }),
);

/** YYYY-MM-DD in local time, used for the earliest allowed service date. */
export function todayIso(now = new Date()) {
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export const contactSchema = z.object({
  customerType: z.enum(["residential", "commercial"], {
    error: "Choose residential or commercial.",
  }),
  firstName: required("your first name", 80),
  lastName: required("your last name", 80),
  businessName: optionalText(160, "Business name is too long."),
  phone: phoneField,
  email: emailField,
  street: required("the service street address", 160),
  city: required("the city", 80),
  state: required("the state", 40),
  zip: z
    .string()
    .check(z.trim(), z.regex(/^\d{5}(-\d{4})?$/, { error: "Please enter a 5-digit ZIP code." })),
  serviceDate: z.string().check(
    z.regex(/^\d{4}-\d{2}-\d{2}$/, { error: "Please choose a service date." }),
    // Allow one day of slack for visitors in other time zones.
    z.refine((value) => value >= todayIso(new Date(Date.now() - 86_400_000)), {
      error: "Please choose a date that isn't in the past.",
    }),
  ),
  serviceType: z.enum(requestableServices, { error: "Please choose a service type." }),
  details: optionalText(2000, "Please keep details under 2,000 characters."),
});

export type ContactField = keyof z.infer<typeof contactSchema>;
