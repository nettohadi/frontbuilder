import React from "react";
import Renderer, { FrontbuilderBadge } from "@frontbuilder/renderer";
import { registerElements } from "@frontbuilder/renderer";

import { ApiErrorType, DataType } from "src/types";
import Page404 from "pages/404";
import Page500 from "pages/500";
import getPageData from "src/getPageData";
import UnPublishedPage from "../../UnPublishedPage";
import CustomHead from "../../../src/CustomHead";

registerElements();
const pageIsNotFound = "PGRST116"; // postgres error code
export default function Index({
  data,
  error,
}: {
  data: DataType;
  error: ApiErrorType;
}) {
  if (error?.code === pageIsNotFound || !data?.page) {
    return <Page404 />;
  }

  if (error?.code) {
    return <Page500 />;
  }

  if (
    !data?.page?.published ||
    Object.keys(data?.page?.published).length === 0
  ) {
    return <UnPublishedPage />;
  }

  return (
    <>
      <CustomHead
        title={data?.page?.name}
        favicon={data?.website?.favicon || "/favicon.ico"}
      />
      <FrontbuilderBadge />
      <Renderer element={data?.page?.published || ""} parent={null} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  return await getPageData(params);
};
