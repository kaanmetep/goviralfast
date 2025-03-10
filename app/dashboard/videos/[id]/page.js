import { createAdminClient } from "@/utils/supabase/server";

import VideoEditPage from "@/components/VideoEditPage";
const Page = async ({ params }) => {
  const paramsId = (await params).id;
  const supabase = createAdminClient();
  const { data: video } = await supabase
    .from("videos")
    .select("*")
    .eq("id", paramsId)
    .single();
  return (
    <div className="w-full bg-white shadow-lg pt-2 mr-2  px-2 rounded-md min-h-screen ">
      <VideoEditPage video={video} />
    </div>
  );
};

export default Page;
