import { supabase } from "./supabase";

const getBySiteAndPage = async (siteSlug: string, pageSlug: string = "") => {
  const website = await getBySiteSlug(siteSlug);
  const page = await getBySiteIdAndPageSlug(website.id, pageSlug);
  return { page, website };
};

const getByCustomDomainAndPage = async (
  customDomain: string,
  pageSlug: string = ""
) => {
  const website = await getByCustomDomain(customDomain);
  const page = await getBySiteIdAndPageSlug(website.id, pageSlug);
  return { page, website };
};

const getBySiteSlug = async (siteSlug: string) => {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("slug", siteSlug)
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};

const getByCustomDomain = async (customDomain: string) => {
  const { data, error } = await supabase
    .from("websites")
    .select("*")
    .eq("customDomain", customDomain)
    .limit(1)
    .single();

  if (error) throw error;
  return data;
};

const getBySiteIdAndPageSlug = async (siteId: string, pageSlug: string) => {
  const pageColumn = pageSlug ? "slug" : "isDefault";
  const pageValue = pageSlug ? pageSlug : true;

  let response;
  response = await supabase
    .from("pages")
    .select("*")
    .eq("website_id", siteId)
    .eq(pageColumn, pageValue)
    .limit(1)
    .single();

  if (response?.error && pageSlug.trim() !== "") throw response?.error;

  if (response?.error && pageSlug.trim() === "") {
    response = await supabase
      .from("pages")
      .select("*")
      .eq("website_id", siteId)
      .limit(1)
      .single();

    if (response?.error) throw response?.error;
  }

  return response?.data;
};

const page = {
  getBySiteAndPage,
  getByCustomDomainAndPage,
};

export default page;
