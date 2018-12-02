import React, { Component } from 'react';
import '../../assets/styles/ItemSelector.css';
import Icon from '../common/Icon';
import { connect } from 'react-redux';
import  * as actions from '../../actions';
import MultiSelect from "@kenshooui/react-multi-select";

/**
 * Class representing the EventSelector section in Item list
 * @class
 */
class EventSelector extends Component {
    /**
     * @function
     * @param 
     * @return {void}
     * This function helps to change the events to the form of [{id:xxx,label:xxx}...]
     */

    componentDidMount(){
        let arr = [];
        if(this.props.rawItems !== null && this.props.rawItems !== undefined) {
            for(var i=0;i<this.props.events.length;i++){
                arr.push({label:this.props.events[i].name,id:this.props.events[i]._id});
            }
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

    /**
     * This function helps to submit the changes in selectedItems
     * @param {Array<item>} selectedItems 
     * @return {void}
     */
    handleChange(selectedItems) {
        this.setState({ selectedItems });
    }


    /**
     * This function helps to submit the selected items and close the pop up window
     * @return {void} 
     */
    handleSubmit() {
        this.props.payload.handleSubmit(this.state.selectedItems);
        this.props.toggleEventSelector();
    }

    /**
     * Render the eventSelector html block.
     * @returns {html} Returns an html object of eventSelector.
     */
    render() {
        const { items, selectedItems } = this.state;
        console.log("items", selectedItems);
        return (
            <div className="item-selector">
                <div className='item-selector-inner'>
                    <div className='close-icon' onClick={() => this.props.toggleEventSelector()}>
                        <Icon  iconName='times'  />
                    </div>
                    <div className='submit' onClick={this.handleSubmit.bind(this)}>
                        <Icon iconName='save'/>
                    </div>
                    <div className='caption' >
                        Please select from following events:
                    </div>
                    <div className='multi-select-container'>
                        {this.state.items.length > 0 ?
                         <MultiSelect
                            items={items}
                            selectedItems={selectedItems}
                            onChange={this.handleChange}
                            responsiveHeight='100%' 
                        />: <h1>no items</h1>
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

export default connect(mapStateToProps, actions)(EventSelector);
