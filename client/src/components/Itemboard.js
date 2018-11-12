import React,{Component} from 'react';
import "../css/Dashboard.css";

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
                                items:['hamburger','chips']
                            },
                            {
                                name:'cupboard',
                                sublayers:[
    
                                ],
                                items:['meat']
                            }
                        ],
                        items:[
                            'hhhh'
                        ]
                    }
                ],
                items:[
                    'hhh',
                    'etpr'
                ],
                parent:null
            }
        };
    }
    
    changeLayer(l){
        this.setState(() => {
            return {container:l};
        });
    }

    

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