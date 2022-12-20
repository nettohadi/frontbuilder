import React from "react";
import Renderer, { ElementType } from "@frontbuilder/renderer";
import { registerElements } from "@frontbuilder/renderer";

import { ApiErrorType } from "src/types";
import Page404 from "pages/404";
import Page500 from "pages/500";
import getPageData from "src/getPageData";

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
  return await getPageData(params);
};
