import { cacheLife } from "next/cache";

/** Cached so the footer stays prerendered; `new Date()` outside a cache scope would block static rendering. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
