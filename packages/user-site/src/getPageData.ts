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
    data = site.includes(".")
      ? await page.getByCustomDomainAndPage(site, slug)
      : await page.getBySiteAndPage(site, slug);
  } catch (e) {
    error = e;
  }

  return {
    props: {
      data: data?.published || {},
      error,
    },
  };
};

export default getPageData;
