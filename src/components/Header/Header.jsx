
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';

const Header = () => {
  
  return (
    <div className="sticky top-0 p-3 flex items-center justify-between z-20 bg-transparent">
      {/* <div className="absolute start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2"></div> */}
      <div className="flex items-center gap-0 overflow-hidden w-full bg-red-500">
        {/* 展开历史记录 */}
      </div>
      <div className="flex items-center gap-2 pe-1 leading-[0]">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;