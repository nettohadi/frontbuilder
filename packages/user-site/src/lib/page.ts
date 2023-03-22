import { supabase } from "./supabase";

const getBySiteAndPage = async (domain: string, pageSlug: string = "") => {
  const website = { favicon: null };

  const page = pageSlug
    ? await getPage(domain, pageSlug)
    : await getDefaultPage(domain);

  return { page, website };
};

const getDefaultPage = async (domain: string) => {
  let response;
  response = await supabase.rpc("select_default_page", { domain });

  if (response?.error) {
    response = await supabase.from("pages").select("*").limit(1).single();
    if (response?.error) throw response?.error;
  }

  return response?.data[0];
};

const getPage = async (domain: string, page_slug: string) => {
  const response = await supabase.rpc("select_page", { domain, page_slug });
  return response?.data?.[0] || null;
};

const page = {
  getBySiteAndPage,
};

export default page;
