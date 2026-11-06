//--------------------------------------------------
//             비로그인용 axios (토큰인증X)
//--------------------------------------------------

import axios from "axios";

const publicInstance = axios.create({
  baseURL: "https://suman-project-31hc.onrender.com/api/", // API 주소. 백엔드 주소 변경시 수정 필수
  timeout: 5000,
});

export default publicInstance;
