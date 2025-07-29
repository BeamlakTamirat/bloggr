const SkeletonCard = () => {
  return (
    <div className="bg-[#1E1E1E] p-6 rounded-xl shadow-lg animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
};
export default SkeletonCard;