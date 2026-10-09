import type { core } from "zod/mini";

export type FormState<Field extends string> =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors: Partial<Record<Field, string>>;
      values: Partial<Record<Field, string>>;
    };

/** First message per field from a failed zod parse. */
export function toFieldErrors<Field extends string>(
  error: core.$ZodError,
): Partial<Record<Field, string>> {
  const out: Partial<Record<Field, string>> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) out[key as Field] = issue.message;
  }
  return out;
}

/** Plain string values from FormData, for re-filling the form after a failed submit. */
export function formValues<Field extends string>(formData: FormData, fields: readonly Field[]) {
  const out: Partial<Record<Field, string>> = {};
  for (const field of fields) {
    const value = formData.get(field);
    if (typeof value === "string") out[field] = value;
  }
  return out;
}

/** Honeypot field name and minimum fill time shared by every public form. */
export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "startedAt";
export const MIN_FILL_MS = 2_500;
