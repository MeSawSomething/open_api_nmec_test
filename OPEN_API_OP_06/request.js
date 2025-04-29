// Operation_06
// 외상센터 목록정보 조회

const servicekey = "별도제공";

const url_1 = `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getStrmListInfoInqire`;

const requestURL = `${url_1}?serviceKey=${servicekey}&_type=xml`;

// 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명
// Q0 | 주소(시도) | 16 | 0 | 서울특별시 | 주소(시도)
// Q1 | 주소(시군구) | 60 | 0 | 강남구 | 주소(시군구)
// QT | 진료요일 | 8 | 0 | 1 | 월일요일(17), 공휴일(8)
// QZ | 기관분류 | 1 | 0 | A | CODE_MST의 'H000' 참조 (AH, JO, Q)
// QD | 진료과목 | 4 | 0 | D000 | CODE_MST의 'D000' 참조 (D000~D029)
// QN | 기관명 | 100 | 0 | 삼성의료원 | 기관명
// ORD | 순서 | 20 | 0 | NAME | 순서
// pageNo | 페이지 번호 | 100 | 0 | 1 | 페이지 번호
// numOfRows | 목록 건수 | 100 | 0 | 10 | 목록 건수

const fieldMap = {
  rnum: "일련번호",
  hpid: "기관ID",
  phpid: "기관ID(OLD)",
  dutyEmcls: "응급의료기관분류",
  dutyEmclsName: "응급의료기관분류명",
  dutyAddr: "주소",
  dutyName: "기관명",
  dutyTel1: "대표전화1",
  dutyTel3: "응급실전화",
  wgs84Lon: "병원경도",
  wgs84Lat: "병원위도",
};

fetch(requestURL, {
  method: "GET",
})
  .then((response) => response.text())
  .then((xmlText) => {
    // XML 텍스트를 DOM 객체로 변환
    // console.log(xmlText);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const items = xmlDoc.getElementsByTagName("item");

    let output = `
    <h2>외상센터 목록정보 조회</h2>
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
