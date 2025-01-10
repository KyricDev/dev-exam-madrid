<script>
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://api.test.com',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
})

export default instance
</script>
