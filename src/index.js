import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import attributes from "./attributes";

export const getBG = (image) => {
	let bg = null;
	if (image && image.media_details) {
		const { media_details } = image;
		const { sizes } = media_details;
		const { large, medium_large } = sizes;
		bg = medium_large || large;
	}
	return bg;
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType("goodmotion/gm-block-img-txt", {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	attributes,
});
