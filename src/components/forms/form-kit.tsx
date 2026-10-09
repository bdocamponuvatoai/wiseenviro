"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { useForm, type FieldValues, type Path } from "react-hook-form";
import type * as z from "zod/mini";

import { Button } from "@/components/ui/button";
import { HONEYPOT_FIELD, STARTED_AT_FIELD, toFieldErrors, type FormState } from "@/lib/form-state";

/**
 * Progressive enhancement: the <form> posts straight to the Server Action (works without JS).
 * With JS, the shared zod schema validates synchronously on submit and on blur via react-hook-form,
 * and invalid submits are stopped before they reach the server.
 */
export function useProgressiveForm<Schema extends z.ZodMiniObject>(
  schema: Schema,
  state: FormState<Extract<keyof z.input<Schema>, string>>,
) {
  type Values = z.input<Schema> & FieldValues;
  type Output = z.output<Schema> & FieldValues;
  type Field = Extract<keyof z.input<Schema>, string>;

  const form = useForm<Values, unknown, Output>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status !== "idle") summaryRef.current?.focus();
  }, [state]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const result = schema.safeParse(data);
    if (result.success) return;
    event.preventDefault();
    const errors = toFieldErrors<Field>(result.error);
    const fields = Object.keys(errors) as Field[];
    for (const field of fields) {
      form.setError(field as unknown as Path<Values>, { type: "validate", message: errors[field] });
    }
    if (fields[0]) form.setFocus(fields[0] as unknown as Path<Values>);
  }

  function errorFor(field: Field): string | undefined {
    const client = form.formState.errors[field as keyof typeof form.formState.errors]?.message;
    if (typeof client === "string") return client;
    return state.status === "error" ? state.fieldErrors[field] : undefined;
  }

  function valueFor(field: Field): string | undefined {
    return state.status === "error" ? state.values[field] : undefined;
  }

  return { form, onSubmit, errorFor, valueFor, summaryRef };
}

/** Honeypot (hidden from people and assistive tech) plus a client-set start time. */
export function SpamFields() {
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      {/* Set on the client only, so prerendered HTML stays deterministic. */}
      <input
        type="hidden"
        name={STARTED_AT_FIELD}
        ref={(el) => {
          if (el && !el.value) el.value = String(Date.now());
        }}
      />
    </>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : null}
      {pending ? "Sending…" : children}
    </Button>
  );
}

export function FormStatus({
  state,
  summaryRef,
}: {
  state: FormState<string>;
  summaryRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      role={state.status === "error" ? "alert" : "status"}
      className="focus:outline-none"
    >
      {state.status === "error" ? (
        <p className="border-danger bg-surface text-danger flex gap-3 rounded-md border-2 p-4 font-semibold">
          <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          {state.message}
        </p>
      ) : null}
      {state.status === "success" ? (
        <p className="border-success bg-surface text-success flex gap-3 rounded-md border-2 p-5 text-lg font-semibold">
          <CircleCheck aria-hidden="true" className="mt-1 size-6 shrink-0" />
          {state.message}
        </p>
      ) : null}
    </div>
  );
}
