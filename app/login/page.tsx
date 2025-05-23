"use client";

import { useState } from "react";
import LoginOptions from "@/components/auth/LoginOptions";
import LoginWithEmail from "@/components/auth/LoginWithEmail";
import LoginWithTelegram from "@/components/auth/LoginWithTelegram";

export default function LoginPage() {
  const [step, setStep] = useState<"options" | "email" | "telegram">("options");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md px-11 py-10 bg-white rounded-[20px] shadow-lg">
        {step === "options" && <LoginOptions onSelect={setStep} />}
        {step === "email" && (
          <LoginWithEmail onBack={() => setStep("options")} />
        )}
        {step === "telegram" && (
          <LoginWithTelegram onBack={() => setStep("options")} />
        )}
      </div>
    </div>
  );
}
