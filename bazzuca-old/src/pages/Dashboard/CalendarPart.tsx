import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function CalendarPart() {

    const [currentDate] = useState(new Date());

    const getDaysInMonth = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const formatMonthYear = () => {
        return currentDate.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <Card className="bg-brand-dark border-brand-gray/30">
            <CardHeader>
                <CardTitle className="text-white">{formatMonthYear()}</CardTitle>
                <CardDescription className="text-gray-400">
                    View your scheduled posts
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {getDaysInMonth().map((day, index) => (
                        <div
                            key={index}
                            className={`text-center p-2 text-sm ${day
                                    ? 'text-white hover:bg-brand-gray/50 rounded cursor-pointer'
                                    : ''
                                } ${day === 15 || day === 16 || day === 17
                                    ? 'bg-brand-blue/20 text-brand-blue rounded'
                                    : ''
                                }`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}