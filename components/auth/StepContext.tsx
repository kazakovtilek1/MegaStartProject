import { createContext, useContext, useState, ReactNode } from "react";

export type StepType = "start" | "phone" | "email" | "registration" | "otp";

const stepOrder: StepType[] = [
  "start",
  "phone",
  "email",
  "registration",
  "otp",
];

type StepContextType = {
  step: StepType;
  setStep: (step: StepType) => void;
  next: (nextStep?: StepType) => void;
  back: () => void;
  close: () => void;
};

const StepContext = createContext<StepContextType | undefined>(undefined);

export function StepProvider({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  const [step, setStep] = useState<StepType>("start");
  const [history, setHistory] = useState<StepType[]>([]);

  const next = (nextStep?: StepType) => {
    setHistory((prev) => [...prev, step]);
    if (nextStep) {
      setStep(nextStep);
    } else {
      const currentIndex = stepOrder.indexOf(step);
      if (currentIndex < stepOrder.length - 1) {
        setStep(stepOrder[currentIndex + 1]);
      }
    }
  };

  const back = () => {
    setHistory((prev) => {
      if (prev.length === 0) return prev;

      const newHistory = [...prev];
      const previousStep = newHistory.pop();

      if (previousStep) {
        setStep(previousStep);
      }

      return newHistory;
    });
  };

  const close = () => {
    if (onClose) {
      onClose();
    }
    setStep("start");
    setHistory([]);
  };

  return (
    <StepContext.Provider value={{ step, setStep, next, back, close }}>
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
}
