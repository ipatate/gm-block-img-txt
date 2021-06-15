import { Button, Dashicon, Spinner } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

const ALLOWED_MEDIA_TYPES = ["image"];

const EditImage = ({ props }) => {
	const { attributes, setAttributes } = props;
	const { image } = attributes;
	// getting img detail with id
	const img = useSelect(
		(select) => {
			const { getMedia } = select("core");
			return image.id ? getMedia(image.id) : false;
		},
		[image]
	);
	// update attribute when img is loaded
	useEffect(() => {
		if (!!img) {
			setAttributes({
				image: img,
			});
		}
	}, [img]);

	// update image
	const onUpdateImage = (image) => {
		setAttributes({
			image: image,
		});
	};
	// remove img
	const onRemoveImage = () => {
		setAttributes({
			image: {},
		});
	};
	console.log(image, img);
	console.log(!!image, !img);
	return (
		<div className={`gm-block-edit-image-container`}>
			<MediaUploadCheck>
				<MediaUpload
					title={__("Image", "gm-block-img-txt")}
					onSelect={onUpdateImage}
					allowedTypes={ALLOWED_MEDIA_TYPES}
					value={img}
					render={({ open }) => {
						if (image && img) {
							return (
								<Button
									onClick={onRemoveImage}
									title={__("remove", "gm-block-img-txt")}
								>
									<Dashicon icon="dismiss" />
								</Button>
							);
						}
						return (
							<Button
								onClick={open}
								title={__("add image", "gm-block-img-txt")}
							>
								{!image.id && <Dashicon icon="plus-alt" />}
								{!!image && image.id && !img && <Spinner />}
							</Button>
						);
					}}
				/>
			</MediaUploadCheck>
		</div>
	);
};

export default EditImage;
