import DashboardMain from "@/components/DashboardMain";
import { createClient } from "@/utils/supabase/server";
const Page = async () => {
  const supabase = createClient();

  const { data: videos } = await supabase.from("videos").select();

  return <DashboardMain videos={videos} />;
};

export default Page;
