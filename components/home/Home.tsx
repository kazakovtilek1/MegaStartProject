import Navbar from "./navbar/Navbar";

export default function Home() {
  return (
    <div className="bg-[url('/images/home_background.png')] flex justify-center bg-cover bg-center bg-no-repeat bg-fixed w-350 h-screen rounded-[20px] pt-[3px]">
      <Navbar />
    </div>
  );
}