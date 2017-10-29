import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import CheckPointSelect from 'check_point/CheckPointSelect'

axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelectorAll('meta[name=csrf-token]')[0].getAttribute('content')

ReactDom.render(<CheckPointSelect/>, document.getElementById('app'))
