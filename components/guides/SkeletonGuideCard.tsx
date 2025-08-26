export default function SkeletonGuideCard() {
  return (
    <div className="w-265 h-50 flex gap-8 animate-pulse">
      <div className="w-[200px] h-[200px] bg-gray-300 rounded-full" />
      <div className="flex flex-col gap-3 py-1">
        <div className="w-[120px] h-[24px] bg-gray-300 rounded" />
        <div className="flex gap-6">
          <div className="w-[40px] h-[20px] bg-gray-300 rounded" />
          <div className="w-[70px] h-[20px] bg-gray-300 rounded" />
          <div className="w-[90px] h-[20px] bg-gray-300 rounded" />
        </div>
        <div className="w-[200px] h-[16px] bg-gray-300 rounded" />
      </div>
    </div>
  );
}
