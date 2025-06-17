import Home from "@/components/home/Home";
import ToursCards from "@/components/toursCards/ToursCards";
import Guides from "@/components/guides/Guides";
import LeaveReview from "@/components/leaveReview/LeaveReview";
import Footer from "@/components/footer/Footer";
import { Suspense, lazy } from "react";
import { textClass } from "./styles/lazyLodaingTextStyles";

const Reviews = lazy(() => import("@/components/reviews/Reviews"));
const ContactForm = lazy(() => import("@/components/contactForm/ContactForm"));

export default function Page() {
  return (
    <main>
      <div>
        <Home />
        <ToursCards />
        {/* <Guides /> */}
        <LeaveReview />
        <Suspense
          fallback={<div className={textClass}>Загрузка отзывов...</div>}
        >
          <Reviews />
        </Suspense>
        <Suspense fallback={<div className={textClass}>Загрузка формы...</div>}>
          <ContactForm />
        </Suspense>
        <Footer />
      </div>
    </main>
  );
}
