// Operation_09
// 응급실 및 중증질환 메시지 조회

const servicekey = "별도제공";

const url_1 = `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmSrsillDissMsgInqire`;

const requestURL = `${url_1}?serviceKey=${servicekey}&_type=xml`;

// 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명
// HPID | 기관ID | 10 | 0 | A0000028 | 기관ID
// QN | 기관명 | 100 | 0 | 삼성병원 | 기관명
// Q0 | 주소(시도) | 16 | 0 | 서울특별시 | 주소(시도)
// Q1 | 주소(시군구) | 60 | 0 | 강남구 | 주소(시군구)
// pageNo | 페이지 번호 | 100 | 0 | 1 | 페이지 번호
// numOfRows | 목록 건수 | 100 | 0 | 10 | 목록 건수

const fieldMap = {
  rnum: "일련번호",
  dutyAddr: "기관주소",
  dutyName: "기관명",
  emcOrgCod: "기관코드",
  hpid: "기관코드",
  symBlkMsg: "전달메시지",
  symBlkMsgTyp: "메시지구분",
  symTypCod: "중증질환구분",
  symTypCodMag: "중증질환명",
  symOutDspYon: "중증질환 표출구분",
  symOutDspMth: "표출 차단구분",
  symBlkSttDtm: "차단시작",
  symBlkEndDtm: "차단종료",
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
    <h2>응급실 및 중증질환 메시지 조회</h2>
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
