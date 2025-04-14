import Home from "@/components/home/Home";
import ToursCards from "@/components/toursCards/ToursCards";

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center flex-wrap">
        <Home />
        <ToursCards />
      </div>
    </main>
  );
}
