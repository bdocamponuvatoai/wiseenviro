import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/brand/logo.png";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  sizes?: string;
}

export function Logo({ className, sizes = "(min-width: 1024px) 260px, 200px" }: LogoProps) {
  const alt = `${siteConfig.legalName} home`;
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center rounded-sm", className)}>
      <Image src={logo} alt={alt} sizes={sizes} className="h-auto w-full" />
    </Link>
  );
}
