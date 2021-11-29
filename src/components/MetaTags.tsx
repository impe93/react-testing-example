import React from "react";
import { Helmet } from "react-helmet";

type MetaTagsProps = {
  title?: string;
  desc?: string;
  img?: string;
  noFollow?: boolean;
};

const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  desc = null,
  img = null,
  noFollow = false,
}) => (
  <Helmet>
    {title && <title>{title}</title>}
    <meta name="robots" content={`${noFollow ? "noindex" : "index"},follow`} />
    {title && <meta name="title" content={title} />}
    {desc && <meta name="description" content={desc} />}
    {!noFollow && <meta property="og:type" content="website" />}
    {!noFollow && <meta property="og:url" content={window.location.href} />}
    {title && <meta property="og:title" content={title} />}
    {desc && <meta property="og:description" content={desc} />}
    {img && <meta property="og:image" content={img} />}
    {!noFollow && (
      <meta property="twitter:card" content="summary_large_image" />
    )}
    {!noFollow && (
      <meta property="twitter:url" content={window.location.href} />
    )}
    {title && <meta property="twitter:title" content={title} />}
    {desc && <meta property="twitter:description" content={desc} />}
    {img && <meta property="twitter:image" content={img} />}
  </Helmet>
);

export default MetaTags;
