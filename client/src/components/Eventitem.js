import React,{Component} from 'react';

/**
 * @constructor
 */

export default (props) => {
    return (
        <div 
            style={{border:'solid 1px', 
                    width:'400px',height:'45px',
                    paddingTop:'10px',
                    marginLeft:'90px',
                    marginBottom:'20px'}}
        >

            <body bgcolor="white">
            <text style={{marginLeft:'10px'}}>{props.name}</text>
            <br />
            <text style={{marginLeft:'10px'}}>{props.time}</text>
            </body>
        </div>
    );
};


  