import React, { Component } from 'react';
import { Memo } from 'components';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PropsTypes = {
    data: React.PropTypes.array,
    currentUser: React.PropTypes. string,
    onEdit: React.PropTypes.func,
    onRemove: React.PropTypes.func,
    onStar: React.PropTypes.func
}
const DefaultProps = {
    data: [],
    currentUser: '',
    onEdit: (id, index, contents)=>{ console.error('onEdit is not defined') },
    onRemove: (id, index)=>{ console.error('onRemove is not defined') },
    onStar: (id, index)=>{ console.error('onStar is not defined') }
}

class MemoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
        return update;
    }

    render() {
        console.log('MemoList render method executed')
        const mapToComponents = data => {
            return data.map((memo, i)=>{
                return (
                    <Memo
                        data={memo}
                        ownership={(memo.writer === this.props.currentUser)}
                        key={memo._id}
                        index={i}
                        onEdit={this.props.onEdit}
                        onRemove={this.props.onRemove}
                        onStar={this.props.onStar}
                        currentUser={this.props.currentUser}
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