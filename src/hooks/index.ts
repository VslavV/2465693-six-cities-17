import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppState, AppDispatch } from '../types/state';

const useAppDispatch = ()=> useDispatch<AppDispatch>();

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export {useAppDispatch, useAppSelector};
