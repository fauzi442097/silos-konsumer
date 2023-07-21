export class FetchingDataError extends Error {
    constructor(message = 'Error fetching data') {
        super(message)
        this.name = 'Fetching Error'
    }
}
