import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import CheckPointSettings from 'check_point/CheckPointSettings'

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content')

ReactDom.render(<CheckPointSettings/>, document.getElementById('app'))
