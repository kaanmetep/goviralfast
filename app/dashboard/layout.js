import DashboardSidebar from "@/components/DashboardSidebar";
const layout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default layout;
