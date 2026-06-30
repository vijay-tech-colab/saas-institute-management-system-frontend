import { Metadata } from "next"
import { MultiStepRegistrationForm } from "@/features/auth/components/MultiStepRegistrationForm"

export const metadata: Metadata = {
  title: "Register | Institute Management System",
  description: "Register your institute and get started.",
}

export default function RegisterPage() {
  return (
    <main>
      <MultiStepRegistrationForm />
    </main>
  )
}
