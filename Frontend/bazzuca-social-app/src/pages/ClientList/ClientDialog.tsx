import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface IClientDialogProps {
    isOpen: boolean;
    loading: boolean;
    title: string;
    name?: string;
    setName?: (name: string) => void;
    setIsOpen: (isOpen: boolean) => void;
    onSave: (name: string) => void;
}


export default function ClientDialog(param: IClientDialogProps) {

    return (
        <Dialog open={param.isOpen} onOpenChange={param.setIsOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{param.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                        <Input
                            id="name"
                            type="text"
                            autoComplete="off"
                            placeholder="Enter client name..."
                            value={param.name}
                            onChange={(e) => param.setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => param.setIsOpen(false)}>Cancel</Button>
                    <Button variant="default" onClick={(e) => {
                        e.preventDefault();
                        param.onSave(param.name);
                    }}>{param.loading ? 'Saving...' : 'Save'}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
