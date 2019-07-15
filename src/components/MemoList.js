import React, { Component } from 'react';
import { Memo } from 'components';

const PropsTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes. string
}
const DefaultProps = {
    data: [],
    currentUser: ''
}

class MemoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const mapToComponents = data => {
            return data.map((memo, i)=>{
                return (
                    <Memo
                        data={memo}
                        ownership={(memo.writer === this.props.currentUser)}
                        key={memo._id}
                    ></Memo>
                )
            })
        }
        return (
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}
 
MemoList.propsTypes = PropsTypes;
MemoList.defaultProps = DefaultProps;

export default MemoList;