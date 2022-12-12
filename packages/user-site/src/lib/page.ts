import { supabase } from "./supabase";

const getBySiteAndPage = async (
  siteSlug: string,
  pageSlug: string = "home"
) => {
  const website = await supabase
    .from("websites")
    .select("*")
    .eq("slug", siteSlug)
    .single();

  if (website.status !== 200 && website.error) {
    throw new Error(website.error as any);
  }

  console.log({ pageSlug, websiteId: website.data?.id });
  const page = await supabase
    .from("pages")
    .select("*")
    .eq("website_id", website.data.id)
    .eq("slug", pageSlug)
    .single();

  console.log({ page });
  if (page.status !== 200 && page.error) {
    throw new Error(page.error as any);
  }

  return page.data;
};

const page = {
  getBySiteAndPage,
};

export default page;
