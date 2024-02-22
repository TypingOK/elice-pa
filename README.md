프로젝트를 어떻게 해야할까?

1. 기본적으로 과목들은 별도의 객체로 관리 해야함. (하드 코딩)
2. 필터링을 하는 버튼들은 react-hook-form을 통해 관리를 하는 편이 편할꺼 같음 (검색을 위한 input 바 포함)
3. 화면에 검색된 Card들을 뿌려주는 것들은 grid로 하고 화면 크기에 따라 유동적으로 변할 수 있도록 media query를 설정해주는 편이 좋을 듯함.
4. 주소창에 필터를 걸어준다면 next/navigation에 있는 useRouter를 사용할 것. (scroll 옵션을 false로 설정해야 좋음)
5. 서버 상태 관리를 위해 React-query 사용. (suspense, error boundury을 대응하기 때문에,  캐싱이 되기 때문에 사용자들이 빈화면을 볼 가능성이 적음)
6. 디자인을 빠르게 구현하기 위해서는 shadcn-ui를 사용하는게 편할꺼 같음.

Q
- Label은 예제 화면에도 없고 실제 서비스 중인 화면에도 있지 않은데 어디에 만들어야 하는 것이고 어떤 역할을 하는 것인지?
- API를 elice 프로덕션 서버에서 직접 호출하는 것이 아닌 Next route 기능을 이용하여 프론트엔드에서 Next route로 Next route에서 elice로 호출해야 하는 것인지?
- 예제 필터에서 enroll_type은 무엇을 의미하는 것인지?
- IconText의 임의 아이콘도 Search Area와 마찬가지로 Font-awesome이나 자유롭게 원하는 아이콘을 사용해도 괜찮은지?