"use client";

import { useActionState } from "react";

import { Field, Input, Select, Textarea, describedBy } from "@/components/ui/form-controls";
import { requestableServices } from "@/content/service-types";
import { submitServiceRequest } from "@/lib/actions/contact";
import type { FormState } from "@/lib/form-state";
import { contactSchema, type ContactField } from "@/lib/validations/contact";

import { FormStatus, SpamFields, SubmitButton, useProgressiveForm } from "./form-kit";

const initialState: FormState<ContactField> = { status: "idle" };

export function ContactForm() {
  const [state, formAction] = useActionState(submitServiceRequest, initialState);
  const { form, onSubmit, errorFor, valueFor, summaryRef } = useProgressiveForm(
    contactSchema,
    state,
  );
  const { register } = form;

  if (state.status === "success") return <FormStatus state={state} summaryRef={summaryRef} />;

  const control = (name: ContactField, opts: { hint?: boolean } = {}) => {
    const error = errorFor(name);
    return {
      id: name,
      ...register(name),
      defaultValue: valueFor(name),
      "aria-invalid": error ? true : undefined,
      "aria-describedby": describedBy(name, { hint: opts.hint, error }),
    } as const;
  };

  const customerTypeError = errorFor("customerType");

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate className="relative space-y-6">
      <FormStatus state={state} summaryRef={summaryRef} />
      <SpamFields />

      <fieldset aria-describedby={customerTypeError ? "customerType-error" : undefined}>
        <legend className="mb-2 text-sm font-semibold">
          Customer type{" "}
          <span className="text-danger" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(["residential", "commercial"] as const).map((type) => (
            <label
              key={type}
              className="border-input bg-surface has-checked:border-secondary has-checked:ring-secondary/30 has-focus-visible:outline-ring flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 capitalize has-checked:ring-2 has-focus-visible:outline-3"
            >
              <input
                type="radio"
                value={type}
                {...register("customerType")}
                defaultChecked={valueFor("customerType") === type}
                className="accent-secondary size-4"
              />
              {type}
            </label>
          ))}
        </div>
        <p
          id="customerType-error"
          className="text-danger mt-1.5 text-sm font-semibold empty:hidden"
        >
          {customerTypeError}
        </p>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="firstName" label="First name" required error={errorFor("firstName")}>
          <Input autoComplete="given-name" {...control("firstName")} />
        </Field>
        <Field id="lastName" label="Last name" required error={errorFor("lastName")}>
          <Input autoComplete="family-name" {...control("lastName")} />
        </Field>
      </div>

      <Field
        id="businessName"
        label="Business name"
        hint="For commercial customers."
        error={errorFor("businessName")}
      >
        <Input autoComplete="organization" {...control("businessName", { hint: true })} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="phone" label="Phone" required error={errorFor("phone")}>
          <Input type="tel" inputMode="tel" autoComplete="tel" {...control("phone")} />
        </Field>
        <Field id="email" label="Email" required error={errorFor("email")}>
          <Input type="email" autoComplete="email" {...control("email")} />
        </Field>
      </div>

      <fieldset className="space-y-6">
        <legend className="font-display text-xl tracking-wide">Service address</legend>
        <Field id="street" label="Street address" required error={errorFor("street")}>
          <Input autoComplete="address-line1" {...control("street")} />
        </Field>
        <div className="grid gap-6 sm:grid-cols-[2fr_1fr_1fr]">
          <Field id="city" label="City" required error={errorFor("city")}>
            <Input autoComplete="address-level2" {...control("city")} />
          </Field>
          <Field id="state" label="State" required error={errorFor("state")}>
            <Input
              autoComplete="address-level1"
              {...control("state")}
              defaultValue={valueFor("state") ?? "AL"}
            />
          </Field>
          <Field id="zip" label="ZIP" required error={errorFor("zip")}>
            <Input inputMode="numeric" autoComplete="postal-code" {...control("zip")} />
          </Field>
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="serviceDate"
          label="Requested date of service"
          required
          error={errorFor("serviceDate")}
        >
          <Input type="date" {...control("serviceDate")} />
        </Field>
        <Field id="serviceType" label="Service type" required error={errorFor("serviceType")}>
          <Select {...control("serviceType")} defaultValue={valueFor("serviceType") ?? ""}>
            <option value="" disabled>
              Choose a service…
            </option>
            {requestableServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        id="details"
        label="Details"
        hint="Event size, container size, access notes or anything else that helps."
        error={errorFor("details")}
      >
        <Textarea rows={5} {...control("details", { hint: true })} />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <SubmitButton>Send request</SubmitButton>
        <p className="text-muted-foreground text-sm">
          <span className="text-danger" aria-hidden="true">
            *
          </span>{" "}
          Required field
        </p>
      </div>
    </form>
  );
}
