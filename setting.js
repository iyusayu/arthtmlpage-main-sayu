// 이 파일의 숫자만 수정하고 저장(Commit)하면 GitHub Pages에 반영됩니다.
// startMonth: 표시 시작 월. 예) '2027-02'는 2월, 3월, 4월을 표시합니다.
// months에도 해당 세 달의 키를 작성하세요. total: 전체 슬롯 / booked: 예약 완료 슬롯.
// 예약이 1건 확정되면 해당 달 booked를 0에서 1로 바꾸세요.
// 반드시 0 <= booked <= total, total은 0~30의 정수로 입력하세요.
window.sayuSettings = {
  slots: {
    startMonth: '2026-11',
    months: {
      '2026-11': { total: 2, booked: 0 },
      '2026-12': { total: 2, booked: 0 },
      '2027-01': { total: 2, booked: 0 }
    }
  }
};
