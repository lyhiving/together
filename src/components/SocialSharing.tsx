import {
  FacebookShareButton as FBShareButton,
  FacebookIcon,
  TwitterShareButton as TWShareButton,
  TwitterIcon,
  LinkedinShareButton as LIShareButton,
  LinkedinIcon,
} from "react-share";

export const FacebookShareButton = ({ url }: { url: string }) => {
  return (
    <FBShareButton url={url} quote={`Join me on ${url}`}>
      <FacebookIcon size={32} round />
    </FBShareButton>
  );
};

export const TwitterShareButton = ({ url }: { url: string }) => {
  return (
    <TWShareButton url={url} title={`Join me on`}>
      <TwitterIcon size={32} round />
    </TWShareButton>
  );
};

export const LinkedinShareButton = ({ url }: { url: string }) => {
  return (
    <LIShareButton url={url}>
      <LinkedinIcon size={32} round />
    </LIShareButton>
  );
};
