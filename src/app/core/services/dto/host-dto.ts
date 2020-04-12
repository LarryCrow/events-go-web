import { SocialMediaDto } from './social-media-dto';

/**
 * Host DTO model.
 */
export interface HostDto {
    /** Host ID. */
    user: number;
    /** Name. */
    name: string;
    /** Is activated. */
    is_activated: boolean;
    /** Avatar. */
    avatar: string;
    /** Social media links. */
    social: SocialMediaDto;
    /** Host information. */
    about: string;
    /** Phone. */
    phone: string;
    /** Work email. */
    work_email: string;
}
