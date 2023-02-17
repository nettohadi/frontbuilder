import React, { FC, ReactNode } from "react";
import { customElementProp, ElementType } from "../../types";

const Button: FC<customElementProp> = ({ element, parent, className }) => {
  const { textContent } = element.props;
  const { clickAction } = element.props;
  const isGoToPage = clickAction?.type === "goToPage".toLowerCase();
  const isPreviewPage = window
    ? window.location.href.includes("preview")
    : false;

  let href = clickAction?.value;
  if (isGoToPage && isPreviewPage) {
    href = `/preview/${clickAction.value.websiteId}/${clickAction.value.pageId}`;
  }

  if (isGoToPage && !isPreviewPage) {
    href = `/${clickAction.value.pageSlug}`;
  }

  return (
    <a
      className={`element el-button ${className}`}
      data-testid={element["data-testid"]}
      href={href}
      rel="noreferrer"
      target={clickAction?.openInNewTab ? "_blank" : "_self"}
    >
      {(textContent as ReactNode) || ""}
    </a>
  );
};

export default Button;

export const ButtonElement: ElementType = {
  id: "0.1.1",
  uuid: "0.1.2",
  type: "Button",
  isFunctionComponent: true,
  contentIsEditable: true,
  className: "fr-button",
  props: {
    name: "Button",
    textContent: "Button",
    backgroundColor: "rgb(128, 128, 128)",
    color: "rgb(0, 0, 0)",
    height: "50px",
    width: "100px",
    maxWidth: "100%",
    fontWeight: "700",
    fontSize: "16px",
    borderRadius: "0px",
    padding: "0px",
    margin: "0px",
    textTransform: "none",
    textDecoration: "none",
    fontStyle: "normal",
    borderColor: "rgb(128, 128, 128)",
    borderWidth: 1,
    borderStyle: "solid",
    visibility: "visible",
    fontFamily: "arial",
    clickAction: {
      type: "goToPage",
      value: "",
      openInNewTab: true,
      // type: "goToUrl",
      // url: "0.1.3",
      // openInNewTab: false,
      //--------------------
      // type: "goToElement",
      // elementId: "0.1.3",
    },
  },
  children: [],
};
