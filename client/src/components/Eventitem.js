import React,{Component} from 'react';
import bg from './bg.jpg';

export default () => {
    return (
        <div 
            style={{border:'solid 1px', 
                    width:'400px',height:'245px',
                    paddingTop:'0px',
                    marginLeft:'90px',
                    marginBottom:'20px'}}
        >
            <img src={bg} width="400" height="200" />
            <br />
            <text style={{marginLeft:'10px'}}>Onsite Interview </text>
            <br />
            <text style={{marginLeft:'10px'}}>10 AM - 3 PM</text>
        </div>
    );
};


  