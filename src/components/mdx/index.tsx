import { Memo } from "./Memo";
import MdxImage from "./MdxImage.astro";

export { Memo, MdxImage };

export const mdxComponents = {
  Memo,
  Image: MdxImage,
  img: MdxImage,
};
