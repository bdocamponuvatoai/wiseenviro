"use client";

import { useActionState } from "react";

import { Field, Input, Select, Textarea, describedBy } from "@/components/ui/form-controls";
import { submitJobInterest } from "@/lib/actions/careers";
import type { FormState } from "@/lib/form-state";
import { careerPositions, careersSchema, type CareersField } from "@/lib/validations/careers";

import { FormStatus, SpamFields, SubmitButton, useProgressiveForm } from "./form-kit";

const initialState: FormState<CareersField> = { status: "idle" };

export function CareersForm() {
  const [state, formAction] = useActionState(submitJobInterest, initialState);
  const { form, onSubmit, errorFor, valueFor, summaryRef } = useProgressiveForm(
    careersSchema,
    state,
  );

  if (state.status === "success") return <FormStatus state={state} summaryRef={summaryRef} />;

  const control = (name: CareersField, opts: { hint?: boolean } = {}) => {
    const error = errorFor(name);
    return {
      id: name,
      ...form.register(name),
      defaultValue: valueFor(name),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy(name, { hint: opts.hint, error }),
    } as const;
  };

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative space-y-6">
      <FormStatus state={state} summaryRef={summaryRef} />
      <SpamFields />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="firstName" label="First name" required error={errorFor("firstName")}>
          <Input autoComplete="given-name" {...control("firstName")} />
        </Field>
        <Field id="lastName" label="Last name" required error={errorFor("lastName")}>
          <Input autoComplete="family-name" {...control("lastName")} />
        </Field>
        <Field id="phone" label="Phone" required error={errorFor("phone")}>
          <Input type="tel" inputMode="tel" autoComplete="tel" {...control("phone")} />
        </Field>
        <Field id="email" label="Email" required error={errorFor("email")}>
          <Input type="email" autoComplete="email" {...control("email")} />
        </Field>
      </div>
      <Field id="position" label="Position of interest" required error={errorFor("position")}>
        <Select {...control("position")} defaultValue={valueFor("position") ?? ""}>
          <option value="" disabled>
            Choose a position…
          </option>
          {careerPositions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        id="message"
        label="About you"
        required
        hint="Your availability, relevant experience and any licenses (e.g. CDL)."
        error={errorFor("message")}
      >
        <Textarea rows={6} {...control("message", { hint: true })} />
      </Field>
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
}
