import page from "src/lib/page";

const getPageData = async ({
  site,
  slug = "",
}: {
  site: string;
  slug?: string;
}) => {
  let error: any = {};
  let data: any;

  try {
    data = site.includes("frontbuilder.site")
      ? await page.getBySiteAndPage(site, slug)
      : await page.getByCustomDomainAndPage(site, slug);
  } catch (e) {
    error = e;
  }

  return {
    props: {
      data: data?.draft || {},
      error,
    },
  };
};

export default getPageData;
