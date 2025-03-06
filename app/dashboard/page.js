import DashboardMain from "@/components/DashboardMain";
import { createAdminClient } from "@/utils/supabase/server";
import { auth } from "@/auth";

const Page = async () => {
  const supabase = createAdminClient();
  const session = await auth();
  const isUserPremium = session?.user.userData.is_premium;
  const userEmail = session?.user.userData.email;
  const { data: videos } = await supabase
    .from("videos")
    .select()
    .or(`premium.eq.${isUserPremium ? true : false}, premium.eq.false`);

  return (
    <DashboardMain
      videos={videos}
      isUserPremium={isUserPremium}
      userEmail={userEmail}
    />
  );
};

export default Page;
