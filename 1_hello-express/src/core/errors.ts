class AppError extends Error {
    constructor(public statusCode: number, public customMessage: string = 'Unknow app error') {
        super()
    }
}

export class NotFoundError extends AppError {
    constructor(resource: string = 'Resource') {
        super(404)
        this.customMessage = `${resource} not found!`
    }
}
