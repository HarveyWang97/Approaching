import React,{Component} from 'react';
import "../css/Dashboard.css";
import {connect} from 'react-redux';
import * as actions from '../actions';


/**
 * Class representing the Item dashboard
 * 
 * @class
 */


class Itemboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            container:this.props.structuredItems,
            stk:[this.props.structuredItems]
        };
    }

    componentDidMount(){
        this.props.fetchItems('test','test');
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.structuredItems !== this.props.structuredItems){
            this.setState(
                {
                    container:nextProps.structuredItems,
                    stk:[nextProps.structuredItems]
                }
            );
        }
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
        let sublayers;
        let concrete_items;
        
        if(current!=undefined){
            sublayers = current.sublayers.map( (item,index) => {
                return (
                    <div className="entry" key={index}  onClick={() => this.changeLayer(item)}>
                        <span style={{marginLeft:'18px'}}>{item.name}</span>
                        <span style={{position:'absolute',right:'10px',fontSize:'20px'}}> > </span>
                    </div>
                );
            });
            
            concrete_items = current.items.map((item,index) => {
                return (
                    <div className="entry" key={index}  >
                        <span style={{marginLeft:'18px'}}>{item}</span>
                        <span></span>
                    </div>
                );
            });
        }
        

        return (
            <div style={{float:'left',width:'268px'}}>
                <div className="entry" style={{textAlign:'left'}}>
                    <i 
                        className="fas fa-angle-left" 
                        style={{fontSize:'20px',marginLeft:'10px'}}
                        onClick={() => this.go_back()}
                    >
                    </i>
                    <span style={{marginLeft:'90px'}}>{current == undefined ?'Home': current.name}</span>
                </div>
                {sublayers}
                {concrete_items}
                <div className="addItemRow">
                    <i className="fa fa-plus add" style={{position:'relative',bottom:'2px'}} ></i>
                </div>         
            </div>
        );
    }

    render(){
       
        console.log(this.props.structuredItems);
        console.log('container',this.state.container);
        
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

function mapStateToProps(state){
    return {
        structuredItems:state.items['structuredItems'],
        rawItems:state.items['rawItems']
    };
}


export default connect(mapStateToProps,actions)(Itemboard);