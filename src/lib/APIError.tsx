// ==========================================
// 1. CENTRALIZED ERROR HANDLING
// ==========================================
class APIError extends Error {
  status: number;
  url?: string;
  displayMessage: string;
  code?: string;
  details?: string;
  digest?: string;

  constructor(
    message: string,
    status: number,
    url?: string,
    code?: string,
    details?: string,
  ) {
    const userFacingMessage = details || message;
    const logMessage = `[${status}] ${message}${details && details !== message ? ` → ${details}` : ""}`;
    const payload = JSON.stringify({
      message: userFacingMessage,
      status,
      url,
      code,
      details,
    });

    super(logMessage);
    this.displayMessage = userFacingMessage;
    this.status = status;
    this.url = url;
    this.code = code;
    this.details = details;
    this.name = "APIError";
    this.digest = payload;
  }
}

export default APIError;
