import Home from "@/components/home/Home";
import Tours from "@/components/tours/Tours";
import ToursCards from "@/components/toursCards/ToursCards";

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center flex-wrap">
        <Home />
        <Tours />
      </div>
      <ToursCards />
    </main>
  );
}
