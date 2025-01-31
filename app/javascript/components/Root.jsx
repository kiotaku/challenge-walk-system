import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'

export default class Root extends Component {
  render() {
    return (
      <List>
        <a href="/user/retire">
          <ListItem button>
            <ListItemText primary="ユーザー リタイヤ"/>
          </ListItem>
        </a>
        <a href="/check_point/pass">
          <ListItem button>
            <ListItemText primary="チェックポイント 通過"/>
          </ListItem>
        </a>
        <a href="/user_status">
          <ListItem button>
            <ListItemText primary="ユーザー状態 一覧"/>
          </ListItem>
        </a>
      </List>
    )
  }
}
