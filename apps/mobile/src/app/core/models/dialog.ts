interface BaseDialogOptions {
  /** Message */
  message: string;
  /** Header. */
  header: string;
}

/**
 * Options for confirmation dialog options.
 */
export interface ConfirmationDialogOptions extends BaseDialogOptions { }

/**
 * Information dialog options.
 */
export interface InfoDialogOptions extends BaseDialogOptions { }
