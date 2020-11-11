import { errorType } from "./error-configuration-data";

export interface ErrorConfiguration {
    errorType: string;
    message: string;
}

export interface ErrorRequest {
    error : string;
    key : string;
    value : string;
    errorMessage : string
}