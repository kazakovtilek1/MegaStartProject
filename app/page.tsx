import Home from "@/components/home/Home";
import ToursCards from "@/components/toursCards/ToursCards";
import Guides from "@/components/guides/Guides";
import LeaveReviews from "@/components/leaveReviews/LeaveReviews";
import Reviews from "@/components/reviews/Reviews";
import ContactForm from "@/components/contactForm/ContactForm";

export default function Page() {
  return (
    <main>
      <div className="flex justify-center items-center flex-wrap">
        <Home />
        <ToursCards />
        <Guides />
        <LeaveReviews />
        <Reviews />
        <ContactForm />
      </div>
    </main>
  );
}
