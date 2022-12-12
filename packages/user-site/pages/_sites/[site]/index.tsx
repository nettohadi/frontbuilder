import React from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Renderer from "@frontbuilder/renderer";
import { registerElements } from "@frontbuilder/renderer";

import page from "../../../src/lib/page";

registerElements();
export default function Index({ data }: any) {
  const router = useRouter();
  if (router.isFallback) return <div></div>;

  return <Renderer element={data} parent={null} />;
}

interface PathProps extends ParsedUrlQuery {
  site: string;
}

interface IndexProps {
  data: any;
}

export const getServerSideProps = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site } = params;
  console.log({ site });
  const data = await page.getBySiteAndPage(site);

  let filter: {
    subdomain?: string;
    customDomain?: string;
  } = {
    subdomain: site,
  };

  if (site.includes(".")) {
    filter = {
      customDomain: site,
    };
  }

  return {
    props: {
      data: data.draft,
    },
  };
};
