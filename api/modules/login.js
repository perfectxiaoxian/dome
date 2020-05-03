import {
	BASE
} from "@/api/api.js"
import axios from "@/api/http.js"

const LOGIN = {
	LOGIN: params =>
		axios.post(`${BASE.PRO}/index.php/Home/Public/login`, params),
	WXDLSQ: params =>
		axios.post(`${BASE.PRO}/Home/Public/weixredirect_uri`, params),
	XSZHI: params =>
		axios.post(`${BASE.PRO}/Home/Member/getnewls`, params),
	SHANGW: params =>
		axios.post(`${BASE.PRO}/index.php/Home/Member/getcolist`, params),
	SJZHUYZ: params =>
		axios.post(`${BASE.PRO}/Home/Public/getcode`, params),
	REGISTER: params =>
		axios.post(`${BASE.PRO}/Home/Public/reg`, params),
	YQGZ: params =>
		axios.post(`${BASE.PRO}/index.php/Home/Task/gethandletype`, params)
}
export default LOGIN
