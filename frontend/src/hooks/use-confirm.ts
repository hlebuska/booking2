interface ConfirmDialogOptions {
    title: string;
    description: string;
    onConfirm?: () => void;
}

export default function useConfirm() {
    return ({ title, description, onConfirm }: ConfirmDialogOptions) => {
        window.dispatchEvent(
            new CustomEvent('open-confirm-dialog', {
                detail: { title, description, onConfirm: onConfirm ?? (() => {}) },
            })
        );
    };
}
