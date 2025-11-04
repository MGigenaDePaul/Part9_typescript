export interface DiaryEntry {
  id: number,
  date: string,
  weather: string,
  visibility: string
  comment: string,
};

export interface ErrorEntry {
  data: string
};

export type Diary = DiaryEntry;

export type NewDiary = Omit<Diary, 'id'>;

export type Error = ErrorEntry;