import React, { Component } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import '../css/PictureEditor.css';
import config from '../config';
import Icon from './popup/Icon';
import { connect } from 'react-redux';
import  * as actions from '../actions';

// reference: https://codesandbox.io/s/o68joy0p5
class PictureEditor extends Component {
    constructor(props){
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

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                this.setState({ src: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
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
    
    onCropComplete = (crop, pixelCrop) => {
        this.makeClientCrop(crop, pixelCrop);
    };
    
    onCropChange = crop => {
        this.setState({ crop });
    };
    
    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                "newFile.jpeg"
            );
            this.setState({ croppedImageUrl });
        }
    }
    
    getCroppedImg(image, pixelCrop, fileName) {
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

    handleSubmit() {
        this.props.payload.handleSubmit('picture', this.state.croppedImageUrl);
        this.props.togglePictureEditor();
    }

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
