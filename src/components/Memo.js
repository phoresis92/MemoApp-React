import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

const PropsTypes = {
    data: React.PropTypes.object,
    ownership: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    index: React.PropTypes.number
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
    ownership: true,
    onEdit: (id, index, contents)=>{
        console.error('onEdit function is not defined');
    },
    index: -1
}

class Memo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.data.contents
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //------------------------------------------------------------------------
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
    //------------------------------------------------------------------------
    
    toggleEdit(){
        if(this.state.editMode){
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;

            this.props.onEdit(id, index, contents)
            .then(_=>{
                this.setState({
                    editMode: !this.state.editMode
                })
            })
        }else {
            this.setState({
                editMode: !this.state.editMode,
                value: this.props.data.contents
            })
        }
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        })
    }

    render() { 

        const { data, ownership } = this.props;

        let editedInfo = (
            <span style={{color: '#AAB5BC'}}> · Edited <TimeAgo date={this.props.data.date.edited} live={true} /></span>
        )

        const dropDownMenu = (
            <div className="option-button">
                <a 
                    className="dropdown-button" 
                    id={`dropdown-button-${data._id}`} 
                    data-activates={`dropdown-${data._id}`}
                ><i className="material-icons icon-button">more_vert</i></a>
                <ul id={`dropdown-${data._id}`} className="dropdown-content">
                    <li><a onClick={this.toggleEdit}>Edit</a></li>
                    <li><a>Remove</a></li>
                </ul>
            </div>
        );

        const memoView = (
            <div className="card">
                <div className="info">
                    <a className="username">{data.writer}</a> wrote a log · <TimeAgo date={data.date.created}/>
                    {data.is_edited ? editedInfo : undefined}
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

        const editView = (
            <div>
                <div className="write">
                    <div className="card">
                        <div className="card-content">
                            <textarea
                                className="materialize-textarea"
                                onChange={this.handleChange}
                                value={this.state.value}
                            ></textarea>
                        </div>
                        <div className="card-action">
                            <a onClick={this.toggleEdit}>OK</a>
                        </div>
                    </div>
                </div>
            </div>
        )
        
        return (
            <div className="container memo">
                {this.state.editMode ? editView : memoView}
            </div>
        );
    }
}

Memo.propsTypes = PropsTypes;
Memo.defaultProps = DefaultProps;
 
export default Memo;