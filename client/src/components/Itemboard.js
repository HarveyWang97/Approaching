import React,{Component} from 'react';
import "../css/Dashboard.css";

/**
 * Class representing the Item dashboard
 * 
 * @class
 */


export default class Itemboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            container:{
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
            },
            parent:null
        };
    }
    
    /** 
     * @param {JsonObject} l - The new layer that will be rendered
     * @returns {JsonObject} set the layer to the new layer passed in
    */
    changeLayer(l){
        this.setState(() => {
            return {container:l};
        });
    }

    /**
     * @param {JsonObject} - The current layer rendered on the screen
     * @returns {html} - The html block that contains the layer's name,sublayers and items inside
     */
    renderLayer(current){
        const sublayers = current.sublayers.map(item => {
            return (
                <div className="entry" onClick={() => this.changeLayer(item)}>
                    <span style={{marginLeft:'18px'}}>{item.name}</span>
                    <span style={{position:'absolute',right:'10px',fontSize:'20px'}}> > </span>
                </div>
            );
        });
        const items = current.items.map(item => {
            return (
                <div className="entry"  >
                    <span style={{marginLeft:'18px'}}>{item}</span>
                    <span></span>
                </div>
            );
        });

        return (
            <div style={{float:'left',width:'268px'}}>
                <div className="entry" style={{textAlign:'center'}}>
                    {current.name}
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

        return (
            <div class="split-left left">
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