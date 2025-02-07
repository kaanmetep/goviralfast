import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardMain from "@/components/DashboardMain";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <DashboardSidebar />
      <DashboardMain />
    </div>
  );
};

export default Page;
