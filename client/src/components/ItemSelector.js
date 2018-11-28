import React, { Component } from 'react';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import '../css/ItemSelector.css';
import config from '../config';
import Icon from './popup/Icon';
import { connect } from 'react-redux';
import  * as actions from '../actions';
import MultiSelect from "@kenshooui/react-multi-select";


// reference: https://codesandbox.io/s/o68joy0p5
class ItemSelector extends Component {
    componentDidMount(){
        let arr = [];
        for(var i=0;i<this.props.rawItems.length;i++){
            arr.push({label:this.props.rawItems[i].name,id:this.props.rawItems[i]._id});
        }
        this.setState({items:arr});
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
      render() {
        const { items, selectedItems } = this.state;
        return (
          <div className="item-selector">
          <div className='item-selector-inner'>
                    <div className='close-icon'>
                        <Icon iconName='times' onClick={() => this.props.toggleItemSelector()} />
                    </div>
                    <div className='submit'>
                        <Icon iconName='save'/>
                    </div>
                    <div className='caption' >
                        Please select from following items:
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
        rawItems:state.items['rawItems']
    }
}

export default connect(mapStateToProps, actions)(ItemSelector);
