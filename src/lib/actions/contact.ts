"use server";

import { deliverLead } from "@/lib/deliver-lead";
import { formValues, toFieldErrors, type FormState } from "@/lib/form-state";
import { siteConfig } from "@/lib/site-config";
import { contactSchema, type ContactField } from "@/lib/validations/contact";

import { checkSubmission } from "./spam-guard";

const fields = Object.keys(contactSchema.shape) as ContactField[];

export async function submitServiceRequest(
  _prev: FormState<ContactField>,
  formData: FormData,
): Promise<FormState<ContactField>> {
  const values = formValues(formData, fields);
  const verdict = await checkSubmission(formData);

  // Bots get a success-looking response so they don't retry.
  if (verdict === "bot") return { status: "success", message: "Thanks! We'll be in touch soon." };
  if (verdict === "rate-limited") {
    return {
      status: "error",
      message: `Too many requests from your connection. Please wait a few minutes or call ${siteConfig.phone}.`,
      fieldErrors: {},
      values,
    };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: toFieldErrors<ContactField>(parsed.error),
      values,
    };
  }

  const delivered = await deliverLead("service-request", parsed.data);
  if (!delivered) {
    return {
      status: "error",
      message: `We couldn't send your request right now. Please call us 24/7 at ${siteConfig.phone}.`,
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${parsed.data.firstName}! Your request is in. Our team will contact you soon. For anything urgent, call ${siteConfig.phone}.`,
  };
}
