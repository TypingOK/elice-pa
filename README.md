프로젝트를 어떻게 해야할까?

1. 기본적으로 과목들은 별도의 객체로 관리 해야함. (하드 코딩)
2. 필터링을 하는 버튼들은 react-hook-form을 통해 관리를 하는 편이 편할꺼 같음 (검색을 위한 input 바 포함)
3. 화면에 검색된 Card들을 뿌려주는 것들은 grid로 하고 화면 크기에 따라 유동적으로 변할 수 있도록 media query를 설정해주는 편이 좋을 듯함.
4. 주소창에 필터를 걸어준다면 next/navigation에 있는 useRouter를 사용할 것. (scroll 옵션을 false로 설정해야 좋음) -> 사용 결과 해당 페이지로 이동하려고 하기 때문에 사용 불가. 하려면 window.history.pushState를 이용하는 편이 나을듯함.

- useSearchParams를 이용하는 편이 좋을꺼 같음.

5. 서버 상태 관리를 위해 React-query 사용. (suspense, error boundury을 대응하기 때문에, 캐싱이 되기 때문에 사용자들이 빈화면을 볼 가능성이 적음)
6. 디자인을 빠르게 구현하기 위해서는 shadcn-ui를 사용하는게 편할꺼 같음.

- 먼저 구역을 나누면 필터링 해야 하는 부분과 카드가 나와야 하는 부분으로 나눌 수 있을꺼 같음.
- 카드가 나오는 부분은 필터링 하는 부분의 자식으로 들어가야할 꺼 같음. 두개를 굳이 나눠봐야 이득을 보긴 어려움.

  - 어차피 필터링 부분에서 버튼을 누르면 다시 리렌더링 해야하기 때문 - 개발자 도구로 네트워크를 보내고 가져오는 모습을 보니 아래 형식처럼 데이터를 보내고 있음.

  - 객체에 해당 데이터를 저장하고 보내는 방식으로 해야할꺼 같음.

  - 특이사항이라면 유형에 과목은 course_type을 두개 저장하고 사용 하고 있기 때문에 그 부분을 위해 별도로 배열에 저장하고 처리하는 로직을 세워야 할꺼 같음

- 데이터를 Fetching하는건 React-query를 사용하고 해당 부분은 hooks로 분리하는게 좋을 꺼 같음.

  - fetcher 함수도 분리하는게 이후에 편해질 꺼 같음 (유지보수).

          {"$and":[{"title":"%%"},{"$or":[{"status":2},{"status":3},{"status":4}]},{"$or":[]},{"$or":[{"course_type":1},{"course_type":3}]},{"is_datetime_enrollable":true}]}

    Q

- Label은 예제 화면에도 없고 실제 서비스 중인 화면에도 있지 않은데 어디에 만들어야 하는 것이고 어떤 역할을 하는 것인지?
- API를 elice 프로덕션 서버에서 직접 호출하는 것이 아닌 Next route 기능을 이용하여 프론트엔드에서 Next route로 Next route에서 elice로 호출해야 하는 것인지?
- 예제 필터에서 enroll_type은 무엇을 의미하는 것인지?
- IconText의 임의 아이콘도 Search Area와 마찬가지로 Font-awesome이나 자유롭게 원하는 아이콘을 사용해도 괜찮은지?
