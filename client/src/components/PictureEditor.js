import React, { Component } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import '../assets/styles/PictureEditor.css';
import config from '../config';
import Icon from './popup/Icon';
import { connect } from 'react-redux';
import  * as actions from '../actions';

/**
 * @classdesc Called by Popup to construct a picture editor for uploading or 
 * updating a picture for an item or event. This component uses this
 * {@link https://codesandbox.io/s/o68joy0p5 Sandbox sample} as a reference.
 */
class PictureEditor extends Component {
    /**
     * Construct a picture editor for uploading or updating a picture for an 
     * item or eventin the item board. 
     * @param {Object} props - The properties passed in when the component is 
     * constructed. The parent component {@link Popup} should pass a payload
     * via this.props.payload containing handleSubmit, which is  used to update
     * the picture in {@link Popup} and then communicate with the server.
     * @returns {void}
     */
    constructor(props) {
        super(props);
        const { width, height } = config.picture;
        this.state = {
            src: null,
            crop: {
                x: 0,
                y: 0,
                aspect: width / height,
                width: 100,
                height: 100
            }
        };
    }

    /**
     * Handler used after the user select a file to upload
     * @param {Object} e the event that comes from the file input and triggers
     * this handler.
     * @returns {void}
     */
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    /**
     * Handler when the image is loaded in the ReactCrop component.
     * Generate cropped image on user crop event.
     * @param {ImageObject} image an image blob containing the image data.
     * @param {Object} pixelCrop describes where and how much to crop.
     * @returns {void}
     */
    onImageLoaded = (image, pixelCrop) => {
        this.imageRef = image;
    
        // Make the library regenerate aspect crops if loading new images.
        const { crop } = this.state;
    
        if (crop.aspect && crop.height && crop.width) {
            this.setState({
                crop: { ...crop, height: null }
            });
        } else {
            this.makeClientCrop(crop, pixelCrop);
        }
    };

    /**
     * Handler when a crop action is done. Generate cropped image on user crop event.
     * @param {Object} crop the crop rectangle details.
     * @param {Object} pixelCrop describes where and how much to crop.
     * @returns {void}
     */
    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };

    /**
     * Handler when the crop rectangle is changed. Update the crop to the state.
     * @param {Object} crop the new crop rectangle details.
     * @returns {void}
     */
    onCropChange = crop => {
        this.setState({ crop });
    };

    /**
     * Build a image url for the cropped area and store it into this.state.
     * @param {Object} crop the crop rectangle details.
     * @param {Object} pixelCrop describes where and how much to crop.
     * @returns {void}
     */
    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop
            );
            this.setState({ croppedImageUrl });
        }
    }

    /**
     * This method does the real job to crop the image, generate a new
     * image file and convert it to an dataURL.
     * @param {ImageObject} image an image blob containing the image data.
     * @param {Object} pixelCrop describes where and how much to crop.
     */
    getCroppedImg(image, pixelCrop) {
        const canvas = document.createElement("canvas");
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d");
    
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                const quality = Math.min(20000 / blob.size, 1);
                resolve(canvas.toDataURL("image/jpeg", quality));
            }, "image/jpeg");
        });
    }

    /**
     * Handler for updating the parent component {@link Popup}'s image url.
     * Also closes the picture editor component.
     */
    handleSubmit() {
        this.props.payload.handleSubmit('picture', this.state.croppedImageUrl);
        this.props.togglePictureEditor();
    }

    /**
     * Render the PictureEditor html block.
     * @returns {html} Returns an html object of PictureEditor.
     */
    render() {
        return (
            <div className='picture-editor'>
                <div className='picture-editor-inner'>
                    <div className='close-icon'>
                        <Icon iconName='times' onClick={() => this.props.togglePictureEditor()} />
                    </div>
                    <div>
                        <input type="file" name="file" id="file" className="upload-picture" onChange={this.onSelectFile} />
                        <label htmlFor="file">Upload a file</label>
                    </div>
                    {this.state.src && (
                        <ReactCrop
                            src={this.state.src}
                            crop={this.state.crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                            className='cropscreen'
                        />
                    )}
                    <div className='submit' onClick={this.handleSubmit.bind(this)}>
                        <Icon iconName='save'/>
                    </div>
                </div>
            </div>
        ); 
    }
}

function mapStateToProps(state){
    return {
        // user: state.auth,
        // payload: state.popup.payload,
        // events: state.events.rawEvents
    }
}

export default connect(mapStateToProps, actions)(PictureEditor);
