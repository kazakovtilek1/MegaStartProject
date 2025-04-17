import Home from "@/components/home/Home";
import ToursCards from "@/components/toursCards/ToursCards";
import Guides from "@/components/guides/Guides";
import Reviews from "@/components/reviews/Reviews";

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center flex-wrap">
        <Home />
        <ToursCards />
        <Guides />
        <Reviews />
      </div>
    </main>
  );
}
