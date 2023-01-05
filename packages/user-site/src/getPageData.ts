import page from "src/lib/page";
import { DataType } from "./types";

const getPageData = async ({
  site,
  slug = "",
}: {
  site: string;
  slug?: string;
}) => {
  let error: any = {};
  let data: DataType;

  try {
    data = site.includes(".")
      ? await page.getByCustomDomainAndPage(site, slug)
      : await page.getBySiteAndPage(site, slug);
  } catch (e) {
    error = e;
  }

  return {
    props: {
      data: data || null,
      error,
    },
  };
};

export default getPageData;
