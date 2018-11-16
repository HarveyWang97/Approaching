import React,{Component} from 'react';

/**
 * @constructor
 */

export default (props) => {
    return (
        <div 
            style={{border:'solid 1px', 
                    width:'400px',height:'265px',
                    paddingTop:'0px',
                    marginLeft:'90px',
                    marginBottom:'20px'}}
        >

            <img src={props.picture} width="400" height="220" />
            <br />
            <body bgcolor="white">
            <text style={{marginLeft:'10px'}}>{props.name}</text>
            <br />
            <text style={{marginLeft:'10px'}}>{props.time}</text>
            </body>
        </div>
    );
};


  