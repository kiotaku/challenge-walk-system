import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import UserImport from 'user/UserImport'

axios.defaults.headers['X-CSRF-Token'] = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content')

ReactDom.render(<UserImport/>, document.getElementById('app'))
