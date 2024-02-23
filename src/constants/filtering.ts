export interface CourseFilter {
  filterType: "course_type" | "tag_id" | "enroll_type";
  pathType:
    | "courseType"
    | "format"
    | "category"
    | "level"
    | "programmingLanguage"
    | "price";
  filter: { [key: string]: { index: number; data: number[] } };
}

export const courseType: CourseFilter = {
  filter: {
    과목: { index: 1, data: [0, 2] },
    챌린지: { index: 2, data: [1] },
    테스트: { index: 3, data: [3] },
  },
  pathType: "courseType",
  filterType: "course_type",
};

export const format: CourseFilter = {
  filter: {
    "자유 선택형": { index: 4, data: [0] },
    "순차 완료형": { index: 5, data: [2] },
  },
  filterType: "course_type",
  pathType: "format",
};

export const category: CourseFilter = {
  filter: {
    "프로그래밍 기초": { index: 6, data: [12] },
    "데이터 분석": { index: 7, data: [13] },
    웹: { index: 8, data: [14] },
    인공지능: { index: 9, data: [22] },
    알고리즘: { index: 10, data: [23] },
  },
  filterType: "tag_id",
  pathType: "category",
};

export const level: CourseFilter = {
  filter: {
    입문: { index: 11, data: [100] },
    초급: { index: 12, data: [101] },
    중급: { index: 13, data: [102] },
    고급: { index: 14, data: [103] },
    심화: { index: 15, data: [104] },
  },
  filterType: "tag_id",
  pathType: "level",
};

export const programmingLanguage: CourseFilter = {
  filter: {
    C: { index: 16, data: [7] },
    "C++": { index: 17, data: [8] },
    자바: { index: 18, data: [9] },
    파이썬: { index: 19, data: [10] },
    자바스크립트: { index: 20, data: [19] },
    R: { index: 21, data: [20] },
    "HTML/CSS": { index: 22, data: [21] },
    SQL: { index: 23, data: [24] },
    아두이노: { index: 24, data: [25] },
    스크래치: { index: 25, data: [26] },
    코틀린: { index: 26, data: [28] },
    스위프트: { index: 27, data: [29] },
    엔트리: { index: 28, data: [30] },
  },
  filterType: "tag_id",
  pathType: "programmingLanguage",
};

export const price: CourseFilter = {
  filter: {
    무료: { index: 29, data: [0] },
    유료: { index: 30, data: [0] },
    구독: { index: 31, data: [4] },
    학점: { index: 32, data: [6] },
  },
  filterType: "enroll_type",
  pathType: "price",
};

export interface FormData {
  [key: string]: string;
}

export interface Filtered {
  [key: string]: string | boolean | { $or: { course_type: number }[] };
}

export interface Condition {
  [key: string]: number | string | boolean;
}

export interface NestedOrCondition {
  $or: Condition[];
}

export interface Result {
  $or: (Condition | NestedOrCondition)[];
}
