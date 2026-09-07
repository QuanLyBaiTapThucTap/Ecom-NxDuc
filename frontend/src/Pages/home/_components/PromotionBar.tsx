const PromotionBar = () => {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto flex h-10 max-w-[1200px] items-center justify-center gap-1 text-sm">
        <span className="font-medium">Special</span>
        <span>Get 10%</span>
        <span className="font-bold">Discount</span>
        <span>for first order</span>
        <button className="ml-2 font-semibold underline underline-offset-2">
          Register Now
        </button>
      </div>
    </div>
  );
};
export default PromotionBar;
