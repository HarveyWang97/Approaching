import React, { Component } from 'react';
import '../css/ItemSelector.css';
import Icon from './popup/Icon';
import { connect } from 'react-redux';
import  * as actions from '../actions';
import MultiSelect from "@kenshooui/react-multi-select";

class ItemSelector extends Component {
    componentDidMount(){
        let arr = [];
        for(var i=0;i<this.props.rawItems.length;i++){
            arr.push({label:this.props.rawItems[i].name,id:this.props.rawItems[i]._id});
        }
        this.setState({items:arr});
        this.setState({selectedItems:this.props.payload.formatted_details});
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          items: [],
          selectedItems: []
        };
      }
    
    handleChange(selectedItems) {
        this.setState({ selectedItems });
    }

    handleSubmit() {
        this.props.payload.handleSubmit(this.state.selectedItems);
        this.props.toggleItemSelector();
    }

    render() {
        const { items, selectedItems } = this.state;
        console.log("items", selectedItems);
        return (
            <div className="item-selector">
                <div className='item-selector-inner'>
                    <div className='close-icon'>
                        <Icon iconName='times' onClick={() => this.props.toggleItemSelector()} />
                    </div>
                    <div className='submit' onClick={this.handleSubmit.bind(this)}>
                        <Icon iconName='save'/>
                    </div>
                    <div className='caption' >
                        Please select from following items:
                    </div>
                    <div className='multi-select-container'>
                        {this.state.items.length > 0 ?
                            <MultiSelect
                            items={items}
                            selectedItems={selectedItems}
                            onChange={this.handleChange}
                        /> : <h1>no items</h1>
                        } 
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        rawItems:state.items['rawItems'],
        events: state.events.rawEvents
    }
}

export default connect(mapStateToProps, actions)(ItemSelector);
