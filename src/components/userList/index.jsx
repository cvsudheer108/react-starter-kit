import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import * as jsontestActions from 'modules/jsontest';
import UserItem from 'components/userList/UserItem';

export class UserList extends PureComponent {
    static propTypes = {
        'jsontest': PropTypes.object.isRequired,
        'jsontestAPI': PropTypes.object.isRequired
    }

    state = {
        'toggleDetails': Map()
    }

    componentWillMount() {
        this.props.jsontestAPI.getUsers();
    }

    onClick = (e) => {
        let id = e.currentTarget.dataset.id;
        let toggle = this.state.toggleDetails.get(id) ? false : true;
        
        this.setState({
            'toggleDetails': this.state.toggleDetails.set(id, toggle)
        })
    }

    render() {
        let userList = this.props.jsontest.get('userList').toArray();
        let users = userList.map(
            (user, i) => {
                let showDetail = this.state.toggleDetails.get(user.id.toString()) ? true : false;
                return <UserItem 
                            key={`user-${i}`}
                            data_id={user.id}
                            onClick={this.onClick}
                            showDetail={showDetail}
                            {...user}/>;
            }
        );

        return (
            <div>
                User List
                <ul>
                    { users }
                </ul>
            </div>
        );
    }
}

export default connect(
    state => ({
        'jsontest': state.jsontest
    }),
    dispatch => ({
        'jsontestAPI': bindActionCreators(jsontestActions, dispatch)
    })
)(UserList);

