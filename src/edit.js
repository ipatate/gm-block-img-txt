import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	URLInputButton,
} from "@wordpress/block-editor";
import EditImage from "./components/EditImage";
import { getBG } from "./index";

export default function Edit(props) {
	const { attributes, setAttributes } = props;
	const { image, text, target, label } = attributes;
	const bg = getBG(image);
	return (
		<div
			{...useBlockProps({
				style: {
					backgroundImage: bg ? `url(${bg.source_url})` : null,
				},
			})}
		>
			<EditImage props={props} />
			<div className="gm-img-text-content">
				<RichText
					allowedFormats={[]}
					placeholder={__("The title", "gm-block-img-txt")}
					value={text}
					onChange={(content) => setAttributes({ text: content })}
				/>
				<URLInputButton
					url={target}
					onChange={(_target, post) =>
						setAttributes({
							target: _target,
							label: (post && post.title) || label,
						})
					}
				/>
			</div>
		</div>
	);
}
