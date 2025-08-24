import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useRedux";
import {
    selectCategories,
    setCategories,
} from "@/features/categories/redux/category.slice";
import { getCategories } from "@/features/categories/services/getCategories.api";
import type { CategoryState } from "@/features/categories/types/categories.type";

export const useCategories = (): CategoryState => {
    const category = useAppSelector(selectCategories);
    const dispatch = useAppDispatch();

    const handleGetCategories = async (): Promise<void> => {
        dispatch(setCategories(await getCategories()));
    };

    useEffect(() => {
        if (category.categories.length === 0) {
            handleGetCategories();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return category;
};
