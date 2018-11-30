import React, { Component } from 'react';
import '../css/ItemSelector.css';
import Icon from './popup/Icon';
import { connect } from 'react-redux';
import  * as actions from '../actions';
import MultiSelect from "@kenshooui/react-multi-select";

class EventSelector extends Component {
    componentDidMount(){
        let arr = [];
        for(var i=0;i<this.props.events.length;i++){
            arr.push({label:this.props.events[i].name,id:this.props.events[i]._id});
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
        this.props.toggleEventSelector();
    }

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
                    <div style={{marginTop:'70px'}}>
                        {this.state.items.length > 0 ?
                         <MultiSelect
                            items={items}
                            selectedItems={selectedItems}
                            onChange={this.handleChange}
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
