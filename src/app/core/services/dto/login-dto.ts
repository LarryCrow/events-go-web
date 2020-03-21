/**
 * Login DTO model.
 */
export interface LoginDto {
    /** User ID */
    id: number;
    /** Token */
    token: string;
    /** User role */
    role: number;
}
