// Operation_08
// 외상센터 기본정보 조회

const servicekey = "별도제공";

const url_1 = `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getStrmBassInfoInqire`;

const requestURL = `${url_1}?serviceKey=${servicekey}&_type=xml`;

// 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명
// HPID | 기관ID | 10 | 0 | A0000028 | 기관ID
// QN | 기관명 | 100 | 0 | 삼성의료원 | 기관명
// pageNo | 페이지 번호 | 100 | 0 | 1 | 페이지 번호
// numOfRows | 목록 건수 | 100 | 0 | 10 | 목록 건수

const fieldMap = {
  hpid: "기관ID",
  dutyName: "기관명",
  postCdn1: "우편번호1",
  postCdn2: "우편번호2",
  dutyAddr: "주소",
  dutyTel1: "대표전화1",
  dutyTel3: "응급실전화",
  hvec: "응급실",
  hvoc: "수술실",
  hvcc: "신경중환자",
  hvncc: "신생중환자",
  hvccc: "흉부중환자",
  hvicc: "일반중환자",
  hvgc: "입원실",
  dutyHayn: "입원실가용여부(1/2)",
  dutyHano: "병상수",
  dutyInf: "기관설명상세",
  dutyMapimg: "간이약도",
  dutyEryn: "응급실운영여부(1/2)",
  dutyTime1c: "진료시간(월요일)C",
  dutyTime2c: "진료시간(화요일)C",
  dutyTime3c: "진료시간(수요일)C",
  dutyTime4c: "진료시간(목요일)C",
  dutyTime5c: "진료시간(금요일)C",
  dutyTime6c: "진료시간(토요일)C",
  dutyTime7c: "진료시간(일요일)C",
  dutyTime8c: "진료시간(공휴일)C",
  dutyTime1s: "진료시간(월요일)S",
  dutyTime2s: "진료시간(화요일)S",
  dutyTime3s: "진료시간(수요일)S",
  dutyTime4s: "진료시간(목요일)S",
  dutyTime5s: "진료시간(금요일)S",
  dutyTime6s: "진료시간(토요일)S",
  dutyTime7s: "진료시간(일요일)S",
  dutyTime8s: "진료시간(공휴일)S",
  MKioskTy25: "응급실(Emergency gate keeper)",
  MKioskTy1: "뇌출혈수술",
  MKioskTy2: "뇌경색의재관류",
  MKioskTy3: "심근경색의재관류",
  MKioskTy4: "복부손상의수술",
  MKioskTy5: "사지접합의수술",
  MKioskTy6: "응급내시경",
  MKioskTy7: "응급투석",
  MKioskTy8: "조산산모",
  MKioskTy9: "정신질환자",
  MKioskTy10: "신생아",
  MKioskTy11: "중증화상",
  wgs84Lon: "병원경도",
  wgs84Lat: "병원위도",
  dgidIdName: "진료과목",
  hpbdn: "병상수",
  hpccuyn: "흉부중환자실",
  hpcuyn: "신경중환자실",
  hperyn: "응급실",
  hpgryn: "입원실",
  hpicuyn: "일반중환자실",
  hpnicuyn: "신생아중환자실",
  hpopyn: "수술실",
};

fetch(requestURL, {
  method: "GET",
})
  .then((response) => response.text())
  .then((xmlText) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const items = xmlDoc.getElementsByTagName("item");

    let output = `
    <h2>외상센터 기본정보 조회</h2>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          ${Object.values(fieldMap)
            .map((fieldName) => `<th>${fieldName}</th>`)
            .join("")}
        </tr>
      </thead>
      <tbody>
  `;

    for (let i = 0; i < items.length; i++) {
      output += `<tr>`;
      for (const key of Object.keys(fieldMap)) {
        const value = items[i].getElementsByTagName(key)[0]?.textContent || "-";
        output += `<td>${value}</td>`;
      }
      output += `</tr>`;
    }

    output += `
        </tbody>
      </table>
    `;

    document.getElementById("result").innerHTML = output;
  })
  .catch((error) => console.error("요청 실패:", error));
