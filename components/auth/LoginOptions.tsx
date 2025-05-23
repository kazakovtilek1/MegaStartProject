import Link from "next/link";

export default function LoginOptions({
  onSelect,
}: {
  onSelect: (step: "email" | "telegram") => void;
}) {
  return (
    <div className="flex flex-col">
      <h2 className="text-[32px] font-medium text-center">Вход</h2>
      <button
        onClick={() => onSelect("telegram")}
        className="w-full p-2.5 bg-[#F7F8FA] font-medium text-base shadow-inner cursor-pointer hover:bg-[#e5e5e7] rounded-[10px] my-11"
      >
        Войти через Telegram
      </button>
      <button
        onClick={() => onSelect("email")}
        className="w-full p-2.5 bg-[#F7F8FA] font-medium text-base shadow-inner cursor-pointer hover:bg-[#e5e5e7] rounded-[10px]"
      >
        Вход через почту
      </button>
      <Link
        href={"/registration"}
        className="mt-11 mb-16 text-base font-medium"
      >
        Зарегистрироваться
      </Link>
      <button className="w-full bg-[#3DD0C9] p-[10px] rounded-[10px] font-medium text-xl cursor-pointer hover:bg-[#e5e5e7]">
        Вход
      </button>
    </div>
  );
}
