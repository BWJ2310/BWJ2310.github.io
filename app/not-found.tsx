import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-heading text-4xl">Not found</h1>
      <p className="mt-4 text-muted-foreground">That page does not exist in this portfolio.</p>
      <Link className={buttonVariants({ className: "mt-6" })} href="/">
        Return home
      </Link>
    </div>
  )
}
