import React, { Component } from 'react';
import "../../assets/styles/itemboard/Layer.css";
import { connect } from 'react-redux';
import * as actions from '../../actions';

/**
 * Class representing a layer card in the Item dashboard
 * 
 * @class
 */
class Layer extends Component {
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