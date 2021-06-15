import { useBlockProps, RichText } from "@wordpress/block-editor";
import { getBG } from "./index";

export default function save(props) {
	const { attributes } = props;
	const { image, text, target, label } = attributes;
	const bg = getBG(image);
	return (
		<div
			{...useBlockProps.save({
				style: {
					backgroundImage: bg ? `url(${bg.source_url})` : null,
				},
			})}
		>
			<a href={target} title={label} className="gm-img-text-content">
				<RichText.Content tagName="span" value={text} />
			</a>
		</div>
	);
}
