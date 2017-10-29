import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import UserStatus from 'user_status/UserStatus'

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content')

ReactDom.render(<UserStatus/>, document.getElementById('app'))
