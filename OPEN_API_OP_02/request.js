// Operation_02
// 중증질환자 수용가능정보 조회

const servicekey = "별도제공";

const url_1 = `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getSrsillDissAceptncPosblInfoInqire`;

// 항목명(영문) | 항목명(국문) | 항목크기 | 항목구분 | 샘플데이터 | 항목설명     |
//    Q0      | 주소(시도)   |   16    |   0    |  서울특별시 |주소(시도)   |
//    Q1      | 주소(시군구)  |  60    |    0    |   강남구   | 주소(시군구)  |
//    QT      |    진료요일   |   1    |    0    |    1     | 월~일요일(1~7), 공휴일(8) |
//    QZ      |   기관분류    |   1    |     0   |    A     | CODE_MST의'H000' 참조(A~H, J~O, Q) |
//    QD      |   진료과목    |   4    |    0    |   D000   | CODE_MST의'D000' 참조(D000~D029) |
//    QN      |    기관명     |   100  |    0    | (사)삼성생명공익재단 삼성서울병원 |  기관명  |
//   ORD      | 순서         |   20    |    0   |  NAME     | 순서 |
// pageNo     | 페이지 번호   |   100   |    0   |    1      | 페이지 번호 |
// numOfRows  |  목록 건수    |   100  |     0   |   10     |  목록 건수  |

// Q0없이 보내면 강원도 데이터만.
const requestURL = `${url_1}?serviceKey=${servicekey}&Q0=서울특별시&pageNo=1&numOfRows=100&_type=xml`;

const fieldMap = {
  dutyName: "기관명",
  hpid: "기관ID",
  mkioskty28: "응급실(Emergency gate keeper)",
  mkioskty1: "[재관류중재술] 심근경색",
  mkioskty2: "[재관류중재술] 뇌경색",
  mkioskty3: "[뇌출혈수술] 거미막하출혈",
  mkioskty4: "[뇌출혈수술] 거미막하출혈 외",
  mkioskty5: "[대동맥응급] 흉부",
  mkioskty6: "[대동맥응급] 복부",
  mkioskty7: "[담낭담관질환] 담낭질환",
  mkioskty8: "[담낭담관질환] 담도포함질환",
  mkioskty9: "[복부응급수술] 비외상",
  mkioskty10: "[장중첩/폐색] 영유아",
  mkioskty11: "[응급내시경] 성인 위장관",
  mkioskty12: "[응급내시경] 영유아 위장관",
  mkioskty13: "[응급내시경] 성인 기관지",
  mkioskty14: "[응급내시경] 영유아 기관지",
  mkioskty15: "[저체중출생아] 집중치료",
  mkioskty16: "[산부인과응급] 분만",
  mkioskty17: "[산부인과응급] 산과수술",
  mkioskty18: "[산부인과응급] 부인과수술",
  mkioskty19: "[중증화상] 전문치료",
  mkioskty20: "[사지접합] 수족지접합",
  mkioskty21: "[사지접합] 수족지접합 외",
  mkioskty22: "[응급투석] HD",
  mkioskty23: "[응급투석] CRRT",
  mkioskty24: "[정신과적응급] 폐쇄병동입원",
  mkioskty25: "[안과적수술] 응급",
  mkioskty26: "[영상의학혈관중재] 성인",
  mkioskty27: "[영상의학혈관중재] 영유아",
  MKioskTy10Msg: "장중첩/폐색(영유아) 가능연령",
  MKioskTy12Msg: "위장관 응급내시경(영유아) 가능연령",
  MKioskTy14Msg: "기관지 응급내시경(영유아) 가능연령",
  MKioskTy15Msg: "저체중 출생아 가능연령",
  MKioskTy27Msg: "영상의학 혈관 중재적 시술(영유아) 가능연령",
};

fetch(requestURL, {
  method: "GET",
})
  .then((response) => response.text())
  .then((xmlText) => {
    // XML 텍스트를 DOM 객체로 변환
    console.log(xmlText);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    const items = xmlDoc.getElementsByTagName("item");

    let output = `
    <h2>중증질환자 수용가능정보 조회</h2>
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
