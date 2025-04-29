// Operation_01
// 가용병상정보

const servicekey = "별도제공";

const url_1 = `http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire`;

const requestURL = `${url_1}?serviceKey=${servicekey}&STAGE1=서울특별시&_type=xml`;

// 항목명(영문)	| 항목명(국문) |	항목크기 |	항목구분 |	샘플데이터 |	항목설명 |
// STAGE1	    |주소(시도)	    |16	      |1	       |서울특별시	|주소(시도)  |
// STAGE2	    |주소(시군구)	  |60       |	1	       |강남구	    |주소(시군구)|
// pageNo	    |페이지 번호	  |100	    |0	       |1	         |페이지 번호 |
// numOfRows	| 목록 |건수	  |100      |	0	       |10	       |목록 건수   |

const fieldMap = {
  rnum: "일련번호",
  dutyName: "기관명",
  hpid: "기관코드",
  phpid: "기관코드(phpid)",
  hvidate: "입력일시",
  hvec: "일반",
  hvoc: "[기타] 수술실",
  hvcc: "[중환자실] 신경과",
  hvncc: "[중환자실] 신생아",
  hvccc: "[중환자실] 흉부외과",
  hvicc: "[중환자실] 일반",
  hvgc: "[입원실] 일반",
  hvdnm: "당직의",
  hvctayn: "CT가용",
  hvmriayn: "MRI가용",
  hvangioayn: "혈관촬영기 가용",
  hvventiayn: "인공호흡기 가용",
  hvventisoayn: "인공호흡기 조산아 가용",
  hvincuayn: "인큐베이터 가용",
  hvcrrtayn: "CRRT 가용",
  hvecmoayn: "ECMO 가용",
  hvoxyayn: "고압산소치료기 가용",
  hvhypoayn: "중심체온조절유도기 가용",
  hvamyn: "구급차 가용",
  hv1: "응급실 당직의 연락처",
  hv2: "[중환자실] 내과",
  hv3: "[중환자실] 외과",
  hv4: "외과입원실(정형외과)",
  hv5: "신경과 입원실",
  hv6: "[중환자실] 신경외과",
  hv7: "약물중환자",
  hv8: "[중환자실] 화상",
  hv9: "[중환자실] 외상",
  hv10: "VENTI(소아)",
  hv11: "인큐베이터(보육기)",
  hv12: "소아당직의 직통연락처",
  hv13: "격리진료구역 음압격리병상",
  hv14: "격리진료구역 일반격리병상",
  hv15: "소아음압격리",
  hv16: "소아일반격리",
  hv17: "[응급전용] 중환자실 음압격리",
  hv18: "[응급전용] 중환자실 일반격리",
  hv19: "[응급전용] 입원실 음압격리",
  hv21: "[응급전용] 입원실 일반격리",
  hv22: "감염병 전담병상 중환자실",
  hv23: "감염병 전담병상 중환자실 내 음압격리병상",
  hv24: "[감염] 중증 병상",
  hv25: "[감염] 준-중증 병상",
  hv26: "[감염] 중등증 병상",
  hv27: "코호트 격리",
  hv28: "소아",
  hv29: "응급실 음압 격리 병상",
  hv30: "응급실 일반 격리 병상",
  hv31: "[응급전용] 중환자실",
  hv32: "[중환자실] 소아",
  hv33: "[응급전용] 소아중환자실",
  hv34: "[중환자실] 심장내과",
  hv35: "[중환자실] 음압격리",
  hv36: "[응급전용] 입원실",
  hv37: "[응급전용] 소아입원실",
  hv38: "[입원실] 외상전용",
  hv39: "[기타] 외상전용 수술실",
  hv40: "[입원실] 정신과 폐쇄병동",
  hv41: "[입원실] 음압격리",
  hv42: "[기타] 분만실",
  hv43: "[기타] 화상전용처치실",
  hv60: "외상소생실",
  hv61: "외상환자진료구역",
  dutyTel3: "응급실 전화",
  HVS01: "일반_기준",
  HVS02: "소아_기준",
  HVS03: "응급실 음압 격리 병상_기준",
  HVS04: "응급실 일반 격리 병상_기준",
  HVS05: "[응급전용] 중환자실_기준",
  HVS06: "[중환자실] 내과_기준",
  HVS07: "[중환자실] 외과_기준",
  HVS08: "[중환자실] 신생아_기준",
  HVS09: "[중환자실] 소아_기준",
  HVS10: "[응급전용] 소아중환자실_기준",
  HVS11: "[중환자실] 신경과_기준",
  HVS12: "[중환자실] 신경외과_기준",
  HVS13: "[중환자실] 화상_기준",
  HVS14: "[중환자실] 외상_기준",
  HVS15: "[중환자실] 심장내과_기준",
  HVS16: "[중환자실] 흉부외과_기준",
  HVS17: "[중환자실] 일반_기준",
  HVS18: "[중환자실] 음압격리_기준",
  HVS19: "[응급전용] 입원실_기준",
  HVS20: "[응급전용] 소아입원실_기준",
  HVS21: "[입원실] 외상전용_기준",
  HVS22: "[기타] 수술실_기준",
  HVS23: "[기타] 외상전용 수술실_기준",
  HVS24: "[입원실] 정신과 폐쇄병동_기준",
  HVS25: "[입원실] 음압격리_기준",
  HVS26: "[기타] 분만실_기준",
  HVS27: "CT_기준",
  HVS28: "MRI_기준",
  HVS29: "혈관촬영기_기준",
  HVS30: "인공호흡기 일반_기준",
  HVS31: "인공호흡기 조산아_기준",
  HVS32: "인큐베이터_기준",
  HVS33: "CRRT_기준",
  HVS34: "ECMO_기준",
  HVS35: "중심체온조절유도기_기준",
  HVS36: "[기타] 화상전용처치실_기준",
  HVS37: "고압산소치료기_기준",
  HVS38: "[입원실] 일반_기준",
  HVS46: "격리진료구역 음압격리_기준",
  HVS47: "격리진료구역 일반격리_기준",
  HVS48: "소아음압격리_기준",
  HVS49: "소아일반격리_기준",
  HVS50: "[응급전용] 중환자실 음압격리_기준",
  HVS51: "[응급전용] 중환자실 일반격리_기준",
  HVS52: "[응급전용] 입원실 음압격리_기준",
  HVS53: "[응급전용] 입원실 일반격리_기준",
  HVS54: "감염병 전담병상 중환자실_기준",
  HVS55: "감염병 전담병상 중환자실 내 음압격리병상_기준",
  HVS56: "[감염] 중증 병상_기준",
  HVS57: "[감염] 준-중증 병상_기준",
  HVS58: "[감염] 중등증 병상_기준",
  HVS59: "코호트 격리_기준",
  HVS60: "외상소생실_기준",
  HVS61: "외상환자진료구역_기준",
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
    <h2>응급실 실시간 가용 병상 정보</h2>
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
