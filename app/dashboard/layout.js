import DashboardSidebar from "@/components/DashboardSidebar";
const layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 ">
      <DashboardSidebar />
      <div className="md:ml-[335px] w-full   ">{children}</div>
    </div>
  );
};

export default layout;
