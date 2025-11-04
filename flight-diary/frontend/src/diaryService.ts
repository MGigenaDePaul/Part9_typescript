import axios from 'axios';
import { apiBaseUrl } from './constants';
import type { Diary, NewDiary } from './types';

export const getAllDiaries = () => {
    return axios
    .get<Diary[]>(`${apiBaseUrl}/diaries`)
    .then(response => response.data)
}

export const createDiary = (object: NewDiary) => {
    return axios
    .post<Diary>(`${apiBaseUrl}/diaries`, object)
    .then(response => response.data);
}

