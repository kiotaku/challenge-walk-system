import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import UserAllDelete from 'user/UserAllDelete'

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content')

ReactDom.render(<UserAllDelete/>, document.getElementById('app'))
