// Operation_04
// 응급의료기관 위치정보 조회

const servicekey = "별도제공";

const url_1 = `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEgytLcinfoInqire`;

const requestURL = `${url_1}?serviceKey=${servicekey}&_type=xml`;

const fieldMap = {
  rnum: "일련번호",
  cnt: "건수",
  distance: "거리",
  dutyAddr: "주소",
  dutyDiv: "병원분류",
  dutyDivName: "병원분류명",
  dutyFax: "팩스번호",
  dutyName: "기관명",
  dutyTel1: "대표전화1",
  endTime: "종료시간",
  hpid: "기관ID",
  latitude: "병원위도",
  longitude: "병원경도",
  startTime: "시작시간",
};

fetch(requestURL, {
  method: "GET",
})
  .then((response) => response.text())
  .then((xmlText) => {
    console.log(xmlText);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const items = xmlDoc.getElementsByTagName("item");

    let output = `
    <h2>응급의료기관 위치정보 조회</h2>
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
