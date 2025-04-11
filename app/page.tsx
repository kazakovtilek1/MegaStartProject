import Home from "@/components/home/Home";
import Tours from "@/components/tours/Tours";

export default function Page() {
  return (
    <main className="flex justify-center items-center flex-wrap">
      <Home />
      <Tours />
    </main>
  );
}
