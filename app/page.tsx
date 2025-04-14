import Home from "@/components/home/Home";
import ToursCards from "@/components/toursCards/ToursCards";
import Guides from "@/components/guides/Guides";

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center flex-wrap">
        <Home />
        <ToursCards />
        <Guides />
      </div>
    </main>
  );
}
