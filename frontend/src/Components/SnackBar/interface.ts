

export interface ISnackBarProps {
    open: boolean;
    handleClose: () => void;
    message: string;
    severity: "success" | "error" | "warning" | "info";
    icon: React.ReactElement;
}