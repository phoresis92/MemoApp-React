import React from 'react';

const PropsTypes = {
    onPost: React.PropTypes.func
}
const DefaultProps = {
    onPost: (contents) => { console.error('post function is not defined') }
}

class Write extends React.Component {

    constructor(props){
        super(props);
        this.state={
            contents: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleChange(e){
        this.setState({
            contents: e.target.value
        })
    }

    handlePost(){
        let contents = this.state.contents;

        this.props.onPost(contents)
        .then(_=>{
            this.setState({
                contents: ''
            })
        })
    }

    render() {
        return (
            <div className="container write">
                <div className="card">
                    <div className="card-content">
                        <textarea 
                            className="materialize-textarea" 
                            placeholder="Write down your memo"
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

Write.propTypes = PropsTypes;
Write.defaultProps = DefaultProps;

export default Write;