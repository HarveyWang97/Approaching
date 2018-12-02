import React, { Component } from 'react';
import config from '../../config';
import '../../assets/styles/Profile.css';
import ls from 'local-storage';
import Icon from '../common/Icon';

/**
 * @classdesc This class renders a row in the Profile.
 */
class ProfileRow extends Component {
    /**
     * Initialize the state variables with corresponding input property data. 
     * 
	 * @constructor
	 * @param {Object} props
	 * @return {void} 
	 */
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.details
        };
    }

    /**
     * If the component receives a new props object that is different from current one,
     * replace the name state with the name in the new props object.
     * @param {Object} nextProps The new props.
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.details !== this.props.details){
            this.setState({item:nextProps.details});
        }
    }

    /**
	 * This method set the value of this row's item to the new input value.
	 * 
	 * @param {JsonObject} event a specific event that invokes this method, e.g. editing the iput form
	 * @return {void} 
	 */
    handleChange(event){
        this.setState({
            item: event.target.value
        });
        this.props.handleEditResult(this.props.field,event.target.value);
        ls.set(this.props.field,event.target.value)
    }

    /**
	 * Render the row in profile based on the given input. 
     * @param {Object} 
     * @return {html} Returns a html block of Profile component. 
	 */
    /**
	 * Render the row based on the given input. 
     * @param {None} 
     * 
     * @return {html} Returns a html block of Popup component. 
	 */
    render() {
        const { iconName, placeholder, details, editing } = this.props;
        return (
            <div className='profile_row'>
                    <div className='profile_icon'>
                        <Icon iconName={iconName}/>
                    </div>
                
                    {editing ? (<input type="text" value={this.state.item} placeholder={placeholder}
                            onChange={this.handleChange.bind(this)} />)
                            : iconName === config.icons["reminder"] ? (<span>{details} hour(s)</span>) : (<span>{details}</span>)
                    }
                </div>
        );
        
    }
}

export default ProfileRow;