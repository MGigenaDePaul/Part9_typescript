export interface DiaryEntry {
  id: number,
  date: string,
  weather: string,
  visibility: string
  comment: string,
};

export type Diary = DiaryEntry;

export type NewDiary = Omit<Diary, 'id'>;

