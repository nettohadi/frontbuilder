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
const pageIsNotFound = "PGRST116";
export default function Index({
  data,
  error,
}: {
  data: DataType;
  error: ApiErrorType;
}) {
  if (error?.code === pageIsNotFound) {
    return <Page404 />;
  }

  if (error?.code) {
    return <Page500 />;
  }

  if (Object.keys(data).length === 0) {
    return <UnPublishedPage />;
  }

  return (
    <>
      <CustomHead
        title={data?.page?.name}
        favicon={data?.website?.favicon || "/favicon.png"}
      />
      <FrontbuilderBadge />
      <Renderer element={data?.page?.published || ""} parent={null} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  return await getPageData(params);
};
