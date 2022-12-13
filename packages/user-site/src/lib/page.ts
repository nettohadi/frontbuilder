import { supabase } from "./supabase";

const getBySiteAndPage = async (
  siteSlug: string,
  pageSlug: string = "home"
) => {
  const website = await getBySiteSlug(siteSlug);

  if (website.status !== 200 && website.error) {
    throw new Error(website.error as any);
  }

  const page = await getBySiteIdAndPageSlug(website.data.id, pageSlug);

  if (page.status !== 200 && page.error) {
    throw new Error(page.error as any);
  }
};

const getByCustomDomainAndPage = async (
  customDomain: string,
  pageSlug: string = "home"
) => {
  const website = await getByCustomDomain(customDomain);

  if (website.status !== 200 && website.error) {
    throw new Error(website.error as any);
  }

  const page = await getBySiteIdAndPageSlug(website.data.id, pageSlug);

  if (page.status !== 200 && page.error) {
    throw new Error(page.error as any);
  }

  return page.data;
};

const getBySiteSlug = async (siteSlug: string) => {
  return supabase.from("websites").select("*").eq("slug", siteSlug).single();
};

const getByCustomDomain = async (customDomain: string) => {
  return supabase
    .from("websites")
    .select("*")
    .eq("customDomain", customDomain)
    .single();
};

const getBySiteIdAndPageSlug = async (siteId: string, pageSlug: string) => {
  return supabase
    .from("pages")
    .select("*")
    .eq("website_id", siteId)
    .eq("slug", pageSlug)
    .single();
};

const page = {
  getBySiteAndPage,
  getByCustomDomainAndPage,
};

export default page;
