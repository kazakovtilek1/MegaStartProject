import Navbar from "./navbar/Navbar";
import { HOME_BACKGROUND } from "@/constants/Images";

export default function Home() {
  return (
    <div
      className="flex justify-center bg-cover bg-center bg-no-repeat bg-fixed w-full h-screen rounded-[20px] p-[3px]"
      style={{ backgroundImage: `url(${HOME_BACKGROUND})` }}
    >
      <Navbar />
    </div>
  );
}
