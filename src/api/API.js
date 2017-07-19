import axios from 'axios'
import config from './config'

// axios(config);
class API {
  //post
  post (param) {
    config.data = param.param;
		return axios.post(param.api,{},config);
	}
  //get
  get (param) {
		// config.data = param.curr;
    config.params = param.param;
		return axios.get(param.api,config);
	}
  put (param) {
    config.data = param.param;
		return axios.put(param.api,{},config);
	}
}
export default API;
