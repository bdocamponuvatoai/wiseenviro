import { describe, expect, it } from "vitest";

import { careersSchema } from "@/lib/validations/careers";
import { contactSchema, todayIso } from "@/lib/validations/contact";

const validContact = {
  customerType: "residential",
  firstName: "Jamie",
  lastName: "Rivera",
  businessName: "",
  phone: "(256) 555-0142",
  email: " jamie@example.com ",
  street: "100 Main St",
  city: "Oxford",
  state: "AL",
  zip: "36203",
  serviceDate: todayIso(),
  serviceType: "Septic Services",
  details: "",
};

describe("contactSchema", () => {
  it("accepts a complete request and trims the email", () => {
    const result = contactSchema.safeParse(validContact);
    expect(result.success).toBe(true);
    expect(result.data?.email).toBe("jamie@example.com");
  });

  it("rejects an empty submission with a message per required field", () => {
    const result = contactSchema.safeParse({});
    expect(result.success).toBe(false);
    const fields = new Set(result.error?.issues.map((i) => i.path[0]));
    for (const field of [
      "customerType",
      "firstName",
      "lastName",
      "phone",
      "email",
      "street",
      "city",
      "state",
      "zip",
      "serviceDate",
      "serviceType",
    ]) {
      expect(fields.has(field)).toBe(true);
    }
    expect(fields.has("businessName")).toBe(false);
    expect(fields.has("details")).toBe(false);
  });

  it.each([
    ["phone", "12345"],
    ["email", "not-an-email"],
    ["zip", "3620"],
    ["serviceType", "Space Launch"],
    ["serviceDate", "2000-01-01"],
  ])("rejects an invalid %s", (field, value) => {
    const result = contactSchema.safeParse({ ...validContact, [field]: value });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.path[0]).toBe(field);
  });

  it("accepts common US phone formats", () => {
    for (const phone of ["256-832-7867", "2568327867", "+1 256 832 7867", "(256) 832-7867"]) {
      expect(contactSchema.safeParse({ ...validContact, phone }).success).toBe(true);
    }
  });
});

describe("careersSchema", () => {
  it("requires a meaningful message", () => {
    const base = {
      firstName: "A",
      lastName: "B",
      phone: "2565550142",
      email: "a@b.co",
      position: "Technician",
    };
    expect(careersSchema.safeParse({ ...base, message: "hi" }).success).toBe(false);
    expect(
      careersSchema.safeParse({ ...base, message: "CDL Class B, available weekdays and weekends." })
        .success,
    ).toBe(true);
  });
});
