import { supabase } from "./supabase";

const getBySiteAndPage = async (
  siteSlug: string,
  pageSlug: string = "home"
) => {
  const website = await getBySiteSlug(siteSlug);
  const page = await getBySiteIdAndPageSlug(website.id, pageSlug);
  return page;
};

const getByCustomDomainAndPage = async (
  customDomain: string,
  pageSlug: string = "home"
) => {
  const website = await getByCustomDomain(customDomain);
  const page = await getBySiteIdAndPageSlug(website.id, pageSlug);
  return page;
};

const getBySiteSlug = async (siteSlug: string) => {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("slug", siteSlug)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const getByCustomDomain = async (customDomain: string) => {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("customDomain", customDomain)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const getBySiteIdAndPageSlug = async (siteId: string, pageSlug: string) => {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("website_id", siteId)
    .eq("slug", pageSlug)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const page = {
  getBySiteAndPage,
  getByCustomDomainAndPage,
};

export default page;
