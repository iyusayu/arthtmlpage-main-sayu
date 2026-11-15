# SAYU · Illustrator & Live2D Rigger

메인페이지: https://iyusayu.github.io/arthtmlpage-main-sayu/
관리 콘솔: https://hanxin123123.github.io/arthtmlpage-console-hanxin/
Firebase 프로젝트: sayuportfolio

## 슬롯 수정
setting.js의 startMonth와 각 월의 total(최대 슬롯), booked(예약 수)를 수정하고 커밋합니다. 2026년 11월·12월·2027년 1월은 각각 총 3개, 예약 0개로 시작합니다.
슬롯은 setting.js가 기준이며 Firebase 일정과 별개입니다.

## 관리
콘솔에 사유 Google 계정(osayu024@gmail.com)으로 로그인 후 sayuportfolio를 연결합니다. 포트폴리오 카테고리와 순서, Drive 이미지 업로드, 날짜별 일정, 방문 분석을 관리할 수 있습니다.
Drive 폴더는 콘솔의 ‘프로젝트 폴더로 정리’로 준비하며 sayuportfolio / 사진 카테고리 / 하위 카테고리 구조입니다.
작품은 처음에 비워 두며 이미지·영상 카테고리는 추가/변경할 수 있습니다.

## 아트머그 연결
상세페이지 주소는 미지정입니다. 주소가 생기면 index.html의 mainPageConfig.artmugUrl과 콘솔 개요의 아트머그 주소를 설정합니다. artmug-embed-code.html의 iframe과 script를 함께 붙여 넣습니다.

## 분석
한신 프로젝트와 분리된 sayuportfolio에 익명 브라우저 방문을 직접 기록합니다. 5초 이상 방문부터 수집하며 상세 기록은 30일, 날짜별 누적 카운터는 유지합니다. 검증 방문도 통계에 포함될 수 있습니다.

공개 Firebase 웹앱 설정만 포함합니다. OAuth 토큰·관리자 키·개인 데이터 내보내기는 저장소에 넣지 않습니다.
