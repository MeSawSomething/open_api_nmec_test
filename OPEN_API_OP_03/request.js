// Operation_03
// 응급의료기관 목록정보 조회

const servicekey = "별도제공";

const url_1 = `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytListInfoInqire`;

const requestURL = `${url_1}?serviceKey=${servicekey}&_type=xml`;

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
    <h2>응급의료기관 목록정보 조회</h2>
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
