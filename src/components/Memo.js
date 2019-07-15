import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

const PropsTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool
}
const DefaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'gogogogo',
        contents: 'wowowowow',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: [1,2,3,4]
    },
    ownership: true
}

class Memo extends Component {

    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidUpdate() {
        // triggered when logged in
        $('#dropdown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Display dropdown below the button
        })
    }
    componentDidMount(){
        // triggered when refreshed
        $('#dropfown-button-'+this.props.data._id).dropdown({
            belowOrigin: true // Displays dropdown below the button
        })
    }
    
    render() { 

        const { data, ownership } = this.props;

        const dropDownMenu = (
            <div className="option-button">
                <a 
                    className="dropdown-button" 
                    id={`dropdown-button-${data._id}`} 
                    data-activates={`dropdown-${data._id}`}
                ><i className="material-icons icon-button">more_vert</i></a>
                <ul id={`dropdown-${data._id}`} className="dropdown-content">
                    <li><a>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
                    {ownership ? dropDownMenu : undefined}
                </div>
                <div className="card-content">
                    {data.contents}
                </div>
                <div className="footer">
                    <i className="material-icons log-footer-icon star icon-button">star</i>
                    <span className="star-count">{data.starred.length}</span>
                </div>
            </div>
        );
        
        return (
            <div className="container memo">
                {memoView}
            </div>
        );
    }
}

Memo.propsTypes = PropsTypes;
Memo.defaultProps = DefaultProps;
 
export default Memo;