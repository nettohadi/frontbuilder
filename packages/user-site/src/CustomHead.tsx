import Head from "next/head";
import React from "react";

const CustomHead = ({
  title = "Page",
  favicon = "/favicon.png",
}: {
  title: string;
  favicon?: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={favicon} />
    </Head>
  );
};

export default CustomHead;
