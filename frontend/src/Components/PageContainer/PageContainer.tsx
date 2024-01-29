import React from "react";
import { IPageContainerProps } from "./PageContainer.types";
import { Helmet } from "react-helmet";

export const PageContainer: React.FC<IPageContainerProps> = (props) => {
  const { title, children, description } = props;
  return (
    <div style={{width: "100%"}}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </div>
  );
};
