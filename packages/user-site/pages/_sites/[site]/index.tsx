import React from "react";
import Renderer, { ElementType } from "@frontbuilder/renderer";
import { registerElements } from "@frontbuilder/renderer";

import page from "../../../src/lib/page";
import { ApiErrorType } from "../../../src/types";
import Page404 from "../../Page404";
import Page500 from "../../Page500";

registerElements();
const pageIsNotFound = "PGRST116";
export default function Index({
  data,
  error,
}: {
  data: ElementType;
  error: ApiErrorType;
}) {
  if (error?.code === pageIsNotFound) {
    return <Page404 />;
  }

  if (error?.code) {
    return <Page500 />;
  }

  return <Renderer element={data} parent={null} />;
}

export const getServerSideProps = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  let error: any = {};
  let data: any;

  try {
    data = site.includes("frontbuilder.site")
      ? await page.getBySiteAndPage(site)
      : await page.getByCustomDomainAndPage(site);
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
