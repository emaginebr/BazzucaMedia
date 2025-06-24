
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PostForm } from "@/pages/Post/PostForm";
import { AuthContext, IAuthProvider } from "nauth-core";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IClientProvider from "@/Contexts/Client/IClientProvider";
import ClientProvider from "@/Contexts/Client/ClientProvider";
import ClientContext from "@/Contexts/Client/ClientContext";
import { getNetworkColor } from "@/components/functions";
import { toast } from "sonner";
import Header from "./Header";
import ConfirmDialog from "@/components/ConfirmDialog";
import ClientResult from "@/DTO/Services/ClientResult";
import IPostProvider from "@/Contexts/Post/IPostProvider";
import PostContext from "@/Contexts/Post/PostContext";
import PostInfo from "@/DTO/Domain/PostInfo";

// React Big Calendar imports
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";

export default function CalendarPage() {

    const navigate = useNavigate();

    const authContext = useContext<IAuthProvider>(AuthContext);
    const postContext = useContext<IPostProvider>(PostContext);
    
    const [events, setEvents] = useState<any[]>([]);

    const locales = {
        'en-US': enUS,
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    useEffect(() => {
        authContext.loadUserSession().then((ret) => {
            if (!authContext.sessionInfo) {
                navigate("/login");
                return;
            }
            postContext.listByUser().then((retPost) => {
                if (!retPost.sucesso) {
                    toast.error(retPost.mensagemErro);
                    return;
                }
            });
        })
    }, []);

    useEffect(() => {
        // Transform posts into calendar events
        const calendarEvents = postContext.posts.map((post: PostInfo) => ({
            id: post.postId,
            title: post.title,
            start: new Date(post.scheduleDate),
            end: new Date(post.scheduleDate), // Assuming posts are point-in-time events
            allDay: false, // Set to true if posts are all-day events
            resource: post, // You can store the full post object here if needed
        }));
        setEvents(calendarEvents || []);
    }, [postContext.posts]); // Re-run when posts change

    // Function to get event properties (like color)
    const eventPropGetter = (event: any, start: Date, end: Date, isSelected: boolean) => {
        const post = event.resource as PostInfo; // Access the original post object stored in 'resource'
        let backgroundColor = '#3174ad'; // Default color for events

        if (post && post.socialNetwork) {
            backgroundColor = getNetworkColor(post.socialNetwork.network);
        }

        return {
            style: {
                backgroundColor,
                color: 'white', // Ensure text is visible on colored background
            },
        };
    };

    const handleSelectEvent = (event: any) => {
        navigate(`/posts/${event.id}`);
    };

    return (
        <>
            <SidebarProvider>
                <div className="min-h-screen flex w-full bg-gradient-dark">
                    <AppSidebar />
                    <main className="flex-1">
                        <div className="p-6">
                            <Header />
                            <Card className="bg-brand-dark border-brand-gray/30">
                                <CardContent className="p-6">
                                    <div style={{ height: '700px' }}> {/* Adjust height as needed */}
                                        <Calendar
                                            localizer={localizer}
                                            events={events}
                                            startAccessor="start"
                                            endAccessor="end"
                                            onSelectEvent={handleSelectEvent}
                                            eventPropGetter={eventPropGetter} // Apply the custom event properties
                                            style={{ height: '100%' }}
                                            className="text-white" // Apply text color to the calendar
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div >
            </SidebarProvider >
        </>
    );
};
