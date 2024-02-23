export interface Filter {
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
