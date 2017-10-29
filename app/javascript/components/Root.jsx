import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'

export default class Root extends Component {
  render() {
    return (
      <List>
        <a href="/check_point/settings">
          <ListItem button>
            <ListItemText primary="チェックポイント 設定"/>
          </ListItem>
        </a>
        <a href="/user/new">
          <ListItem button>
            <ListItemText primary="ユーザー 追加"/>
          </ListItem>
        </a>
        <a href="/user/import">
          <ListItem button>
            <ListItemText primary="ユーザー 追加(csvファイルからインポート)"/>
          </ListItem>
        </a>
        <a href="/user/all_delete">
          <ListItem button>
            <ListItemText primary="ユーザー 全削除"/>
          </ListItem>
        </a>
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
        <a href="/user_status/show">
          <ListItem button>
            <ListItemText primary="ユーザー状態 一覧"/>
          </ListItem>
        </a>
      </List>
    )
  }
}
