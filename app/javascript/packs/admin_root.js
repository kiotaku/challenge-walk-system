import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import AdminRoot from 'AdminRoot'

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content')

ReactDom.render(<AdminRoot/>, document.getElementById('app'))
