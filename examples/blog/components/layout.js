import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input, Icon, Header, Progress, Segment } from 'semantic-ui-react';
import { actions } from '../../../src/index';
import { Link } from '../../../src/react/index';
import { requestSearch } from '../actions';

class Layout extends Component {
  handleChange(e) {
    const action = actions.push(`/posts?q=${e.target.value}`);
    this.props.dispatch(requestSearch(action));
  }

  render() {
    const { loading, children } = this.props;
    return <div>
      <Segment>
        <Header as='h1' style={{ margin: 0 }}>
          <Menu secondary size='massive'>
            <Menu.Item header>
              <Icon name='write' />
              My First Blog
            </Menu.Item>
            <Menu.Item><Link to='/'>Home</Link></Menu.Item>
            <Menu.Item><Link to='/posts'>Posts</Link></Menu.Item>
            <Menu.Item><Link to='/about'>About</Link></Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item><Link to='/users/login'>Login</Link></Menu.Item>
              <Menu.Item><Link to='/admin/posts'>Admin</Link></Menu.Item>
              <Menu.Item><Link external target='_blank' to='https://github.com/kuy/redux-tower'>GitHub</Link></Menu.Item>
              <Menu.Item>
                <Input onChange={this.handleChange.bind(this)} icon='search' placeholder='Search...' />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Header>
        <Progress color={loading ? 'blue' : 'grey'} disabled={!loading} percent={100} attached='bottom' indicating={loading} />
      </Segment>
      {children}
    </div>;
  }
}

function select({ posts: { status } }) {
  return { loading: status === 'working' };
}

export default connect(select)(Layout);
