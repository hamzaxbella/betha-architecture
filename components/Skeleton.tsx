const Skeleton = () => {
  return (
    <div className="absolute inset-0 animate-pulse">
      <div className="w-full h-full bg-gray-200/80 rounded-3xl" />
    </div>
  );
};

export default Skeleton;
