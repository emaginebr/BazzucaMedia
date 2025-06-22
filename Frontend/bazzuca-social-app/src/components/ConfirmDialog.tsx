import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface IRenameDialogProps {
    isOpen: boolean;
    loading: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onExecute: () => void;
}


export default function ConfirmDialog(param: IRenameDialogProps) {

    return (
        <Dialog open={param.isOpen} onOpenChange={param.setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => param.setIsOpen(false)}>No</Button>
                    <Button variant="default" onClick={async (e) => {
                        e.preventDefault();
                        param.onExecute();
                    }}>{param.loading ? "Deleting..." : "Yes"}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
