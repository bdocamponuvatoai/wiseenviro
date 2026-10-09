"use server";

import { deliverLead } from "@/lib/deliver-lead";
import { formValues, toFieldErrors, type FormState } from "@/lib/form-state";
import { siteConfig } from "@/lib/site-config";
import { careersSchema, type CareersField } from "@/lib/validations/careers";

import { checkSubmission } from "./spam-guard";

const fields = Object.keys(careersSchema.shape) as CareersField[];

export async function submitJobInterest(
  _prev: FormState<CareersField>,
  formData: FormData,
): Promise<FormState<CareersField>> {
  const values = formValues(formData, fields);
  const verdict = await checkSubmission(formData);

  if (verdict === "bot") return { status: "success", message: "Thanks for your interest!" };
  if (verdict === "rate-limited") {
    return {
      status: "error",
      message: "Too many submissions from your connection. Please try again in a few minutes.",
      fieldErrors: {},
      values,
    };
  }

  const parsed = careersSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: toFieldErrors<CareersField>(parsed.error),
      values,
    };
  }

  const delivered = await deliverLead("job-interest", parsed.data);
  if (!delivered) {
    return {
      status: "error",
      message: `We couldn't send your form right now. Please call us at ${siteConfig.phone}.`,
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${parsed.data.firstName}! We received your information and will reach out if there's a good fit.`,
  };
}
