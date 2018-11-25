import React,{Component} from 'react';
import "../css/Dashboard.css";
import {fetchItems} from '../Request';
import {connect} from 'react-redux';
import * as actions from '../actions';


/**
 * Class representing the Item dashboard
 * 
 * @class
 */

 const c = {
    name:'home',
    sublayers:[
        {
            name:'kitchen',
            sublayers:[
                {
                    name:'fridge',
                    sublayers:[

                    ],
                    items:['hamburger','chips'],
                    
                },
                {
                    name:'cupboard',
                    sublayers:[

                    ],
                    items:['meat']
                }
            ],
            items:[
                'bowl'
            ]
        }
    ],
    items:[
        'shoes',
        'coat'
    ]
};

class Itemboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            container:c,
            stk:[c]
        };
    }

    

    go_back(){
        if(this.state.stk.length > 1 ){
            this.setState((prevState) => {
                return {stk:prevState.stk.slice(0,-1),container:prevState.stk[prevState.stk.length-2]};
            });
        }
    }
    
    /** 
     * @param {JsonObject} l - The new layer that will be rendered
     * @returns {JsonObject} set the layer to the new layer passed in
    */
    changeLayer(l){
        this.setState((prevState) => {
            return {stk:prevState.stk.concat(l),container:l};
        });
        
      //  console.log(this.state.stk);
    }

    /**
     * @param {JsonObject} - The current layer rendered on the screen
     * @returns {html} - The html block that contains the layer's name,sublayers and items inside
     */
    renderLayer(current){
        const sublayers = current.sublayers.map( (item,index) => {
            return (
                <div className="entry" key={index}  onClick={() => this.changeLayer(item)}>
                    <span style={{marginLeft:'18px'}}>{item.name}</span>
                    <span style={{position:'absolute',right:'10px',fontSize:'20px'}}> > </span>
                </div>
            );
        });
        const items = current.items.map((item,index) => {
            return (
                <div className="entry" key={index}  >
                    <span style={{marginLeft:'18px'}}>{item}</span>
                    <span></span>
                </div>
            );
        });

        return (
            <div style={{float:'left',width:'268px'}}>
                <div className="entry" style={{textAlign:'left'}}>
                    <i 
                        className="fas fa-angle-left" 
                        style={{fontSize:'20px',marginLeft:'10px'}}
                        onClick={() => this.go_back()}
                    >
                    </i>
                    <span style={{marginLeft:'90px'}}>{current.name}</span>
                </div>
                {sublayers}
                {items}
                <div className="addItemRow">
                    <i className="fa fa-plus add" style={{position:'relative',bottom:'2px'}} ></i>
                </div>         
            </div>
        );
    }

    render(){
        fetchItems('test','test');
        return (
            <div className="split-left left">
                <input type="text" placeholder="Search..."  className="searchbar"/>
                <div className="showercase">
                    <div className="vertical" />    
                    <div className="vertical" />
                    {this.renderLayer(this.state.container)}
                </div>
            </div>
        );
    }
}


export default connect(null,actions)(Itemboard);