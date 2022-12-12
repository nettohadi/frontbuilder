import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import page from "../../../src/lib/page";
import Renderer, { registerElements } from "@frontbuilder/renderer";
import React from "react";

registerElements();
export default function Page({ data }: any) {
  const router = useRouter();
  if (router.isFallback) return <div></div>;

  return <Renderer element={data} parent={null} />;
}

interface PathProps extends ParsedUrlQuery {
  site: string;
  slug: string;
}

export const getServerSideProps = async ({ params }) => {
  if (!params) throw new Error("No path parameters found");
  const { site, slug } = params;
  console.log({ site, slug });
  const data = await page.getBySiteAndPage(site, slug);

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
