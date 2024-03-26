import {TodoProps} from './types'

export const storageDataNames = {
    s_showenTodos:'showenTodos',
    s_todoText:'todoText',
    s_todos:'todos',
    s_completedTodos:'completedTodos',
    s_unCompletedTodos:'unCompletedTodos'
}

const storageShowenTodos = localStorage.getItem(storageDataNames.s_showenTodos) != null ? localStorage.getItem(storageDataNames.s_showenTodos) as string : 'all';
const storageTodoText    = localStorage.getItem(storageDataNames.s_todoText) != null ? localStorage.getItem(storageDataNames.s_todoText) as string : 'Test';
const storageTodos = localStorage.getItem(storageDataNames.s_todos) != null ? JSON.parse(localStorage.getItem(storageDataNames.s_todos) as string ) as TodoProps[] : [];
const storageCompletedTodos = localStorage.getItem(storageDataNames.s_completedTodos) != null ? JSON.parse(localStorage.getItem(storageDataNames.s_completedTodos) as string) as TodoProps[]   : [];
const storageUnCompletedTodos = localStorage.getItem(storageDataNames.s_unCompletedTodos) != null ? JSON.parse(localStorage.getItem(storageDataNames.s_unCompletedTodos) as string) as TodoProps[] : [];