import { useState, useEffect, useCallback } from 'react';

interface PaginatedResponse<T> {
    data: T[];
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
}

type FetchFunction<T> = (page: number, pageSize: number) => Promise<PaginatedResponse<T>>;

interface PaginationState {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
}

export const usePagination = <T>(fetchFunction: FetchFunction<T>, initialPageSize: number = 10) => {
    const [data, setData] = useState<T[]>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        page: 1,
        page_size: initialPageSize,
        total: 0,
        total_pages: 1,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetchFunction(pagination.page, pagination.page_size);
            
            setData(res.data);
            setPagination({
                page: res.page,
                page_size: res.page_size,
                total: res.total,
                total_pages: res.total_pages,
            });
        } catch (err) {
            setError(err);
            console.error("Pagination fetch failed:", err);
        } finally {
            setIsLoading(false);
        }
    }, [fetchFunction, pagination.page, pagination.page_size]);

    const handlePageChange = useCallback((newPage: number) => {
        setPagination(prev => ({
            ...prev,
            page: newPage
        }));
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        pagination,
        isLoading,
        error,
        handlePageChange,
        refetch: fetchData,
        setPagination, 
    };
};