"use client";

import { useForm, FormProvider } from "react-hook-form";
import { StepProvider, useStep } from "./StepContext";

import StartStep from "./steps/StartStep";
import StepPhone from "./steps/phone/StepPhone";
import StepOtp from "./steps/phone/StepOtp";
import StepEmail from "./steps/email/StepEmail";
import StepRegistration from "./steps/registration/StepRegistration";

const stepsMap = {
  start: StartStep,
  phone: StepPhone,
  email: StepEmail,
  registration: StepRegistration,
  otp: StepOtp,
};

type LoginStepperProps = {
  onClose: () => void;
};

export default function LoginStepper({ onClose }: LoginStepperProps) {
  return (
    <StepProvider onClose={onClose}>
      <InnerStepper />
    </StepProvider>
  );
}

function InnerStepper() {
  const methods = useForm();
  const { step } = useStep();
  const StepComponent = stepsMap[step];

  return (
    <FormProvider {...methods}>
      <div className="relative w-full">
        <StepComponent />
      </div>
    </FormProvider>
  );
}
