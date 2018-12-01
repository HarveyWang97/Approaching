import React, { Component } from 'react';
import "../../assets/styles/itemboard/Layer.css";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/**
 * Class representing a layer card in the item board
 * 
 * @class
 */
class Layer extends Component {
    /**
     * Render a layer card in the item board. Some data and functions are 
     * passed into this component and used in the render function through
     * this.props from its parent component, {@link Itemboard}. The related fields
     * in this.props are:
     * @param {Object} content - an object for all the data used to render the layer.
     * content.name is the current location name, rendered at the top. 
     * content.sublayers and content.items are rendered in the middle and are 
     * lists of sublayers and items respectively.
     * @param {Object} offset - used to set a position offset with respect to the default
     * position to show the effect of overlapping at most three layers in the
     * item board.
     * @param {Boolean} enable - indicate whether or not all actions should be active.
     * enable is set to true for the top layer and false for the rest layers.
     * @param {Function} changeLayer - a function passed from the parent component, 
     * {@link Itemboard}, asking the {@link Itemboard} to update its state of 
     * current location.
     * @param {Function} goBack - a function passed from the parent component, {@link Itemboard},
     * going to the parent layer.
     * @param {String} className - specify css style class name.
     * @returns {html} Return an html object of a layer card.
     */
    render() {
        const { content, offset, enable, changeLayer, goBack, className } = this.props;
        let sublayers;
        let concrete_items;

        if (content) {
            sublayers = content.sublayers.map( (item, index) => (
                <div
                    className="entry"
                    key={index}
                    onClick={ enable ? () => changeLayer(item) : null }
                >
                    <span className='layer-row-content'>{item.name}</span>
                    <span className='layer-row-icon'>></span>
                </div>
            ));

            concrete_items = content.items.map((item,index) => (
                <div 
                    className="entry" key={index} 
                    onClick = { enable ? () => this.props.togglePopup({
                        contentType:'item',
                        isAdd:false,
                        id:item._id
                    }) : null }
                >
                    <span className='layer-row-content'>{item.name}</span>
                </div>
            ));
        }
        const offsetStyle = { marginLeft: `${offset.x}px`, marginTop: `${offset.y}px` };

        return (
            <div className={className} style={offsetStyle}>
                <div className="layer-header">
                    <i className="fas fa-angle-left layer-back-icon"
                        onClick={ enable ? goBack : null } 
                        style={{visibility: (content&&content.name==='home') ?"hidden" :"visible"}}/>
                    <span className="layer-title">{content ? content.name : 'Home' }</span>
                </div>
                <div className="layer-middle">
                    {sublayers}
                    {concrete_items}
                </div>
                <div className="addItemRow">
                    <i
                        className="fa fa-plus add"
                        onClick={ enable ? () => this.props.togglePopup({
                            contentType: 'item',
                            isAdd: true,
                            id: null,
                            currentLocation: this.props.currentLocation
                        }) : null }
                    />
                </div>         
            </div>
        );
    }
}

export default connect(null, actions)(Layer);