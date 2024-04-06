import { Settings, CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
const Topbar = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex gap-5 justify-center items-center">
            <div className="flex gap-2 text-primary font-bold">
                <CircleUser />
                <h1>ADMINISTRATOR</h1>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="hover:bg-primary hover:text-white">
                        <Settings />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Change Password</SheetTitle>
                        <SheetDescription>
                            Make changes to your password here. Click save when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="current-password" className="text-left">
                                Current Password
                            </Label>
                            <Input
                                id="current-password"
                                type={showPassword ? 'text' : 'password'}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="new-password" className="text-left">
                                New Password
                            </Label>
                            <Input
                                id="new-password"
                                type={showPassword ? 'text' : 'password'}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-2 items-center gap-4">
                            <Label htmlFor="confirm-new-password" className="">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm-new-password"
                                type={showPassword ? 'text' : 'password'}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Checkbox
                            id="show-password"
                            checked={showPassword}
                            onCheckedChange={() => setShowPassword(!showPassword)}
                        />
                        <Label
                            htmlFor="show-password"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Show password
                        </Label>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" className="text-white">
                                Save changes
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default Topbar;
