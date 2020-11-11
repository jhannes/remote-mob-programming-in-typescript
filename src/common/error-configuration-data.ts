import { ErrorConfiguration } from "./error-configuration.model"

export enum errorType {
    GeneralError = "GeneralError",
    ServerError = "ServerError",
    illegalArgument = "illegalArgument"
}

export const english: ErrorConfiguration[] = [
    {
        errorType: errorType.GeneralError,
        message: "Something went wrong"
    },
    {
        errorType: errorType.ServerError,
        message: "The server returned an error: %errorMessage%"
    },
    {
        errorType: errorType.illegalArgument,
        message: "The value is illegal for %property%: %value%"
    }
]

export const norwegian: ErrorConfiguration[] = [
    {
        errorType: errorType.GeneralError,
        message: "Noe gikk galt"
    },
    {
        errorType: errorType.ServerError,
        message: "Serveren returnerte en feil: %errorMessage%"
    },
    {
        errorType: errorType.illegalArgument,
        message: "Verdien for '%property%' er ikke tillat: %value%"
    }
]