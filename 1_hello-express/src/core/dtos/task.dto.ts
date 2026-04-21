export interface CreateTaskDTO {
    title: string;
    description?: string
}

export interface ListTasksQueryParamsDTO extends Partial<{
    orderBy: string;

    limit: string;
    page: string;

    status: string;
}> { }