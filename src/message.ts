import { errorType } from "./common/error-configuration-data";
import { ErrorConfiguration, ErrorRequest } from "./common/error-configuration.model";

export function showError(configurations: ErrorConfiguration[], error: ErrorRequest): string {
    var errorConfig = configurations.find(x => x.errorType === error.error);

    var errorMessage = ""
    if (errorConfig) {
        switch (errorConfig.errorType) {
            case errorType.GeneralError:
                errorMessage = errorConfig.message;
                break;
            case errorType.ServerError:
                errorMessage = errorConfig.message.replace("%errorMessage%", error.errorMessage);
                break;
            case errorType.illegalArgument:
                errorMessage = errorConfig.message.replace("%property%", error.key).replace("%value%", error.value);
                break;
            default:
                errorMessage = "Empty Error";
                break;
        }
    }
    return errorMessage;
}
