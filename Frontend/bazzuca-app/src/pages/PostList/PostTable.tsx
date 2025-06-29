import { getNetworkBadge, getNetworkName, getPostStatusBadge, getPostStatusName } from "@/components/functions";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PostInfo from "@/DTO/Domain/PostInfo";
import PostListPagedInfo from "@/DTO/Domain/PostListPagedInfo";
import { format } from "date-fns";
import { Calendar, Edit, Edit2, Eye, Network, Pencil, Trash, User } from "lucide-react";
import { Link } from "react-router-dom";

interface IPostProps {
    loading: boolean;
    searchResult: PostListPagedInfo;
    changePage: (pageNum: number) => void;
}

export default function PostTable(props: IPostProps) {

    const formatDate = (dateString: string) => {
        if (dateString) {
            return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
        }
        return '';
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Social Network</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Scheduled Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-end">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        props.loading && [1, 2].map((index) => {
                            return (
                                <TableRow key={index} className="cursor-pointer hover:bg-muted/50">
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Skeleton className="h-4 w-[200px] bg-gray-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                            <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                            <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                            <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                            <Skeleton className="h-4 w-[100px] bg-gray-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <Button variant="ghost" size="sm" disabled={true}>
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                    {!props.loading && props.searchResult?.posts.length === 0 && (
                        <TableRow key={0} className="cursor-pointer hover:bg-muted/50">
                            <TableCell colSpan={6} className="text-center">
                                No posts found.
                            </TableCell>
                        </TableRow>
                    )}
                    {!props.loading && props.searchResult?.posts.map((post) => (
                        <>
                            <TableRow key={post.postId} className="cursor-pointer hover:bg-muted/50">
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Link to={`/posts/${post.postId}`}>
                                            <User className="h-4 w-4" style={{ display: 'inline-block' }} />
                                            <span>{post.title}</span>
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Link to={`/posts/${post.postId}`}>
                                            <Badge
                                                variant="secondary"
                                                className={getNetworkBadge(post.socialNetwork.network)}
                                            >{getNetworkName(post.socialNetwork.network)}</Badge>
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Link to={`/posts/${post.postId}`}>
                                            <User className="h-4 w-4" style={{ display: 'inline-block' }} />
                                            <span>{post.client?.name}</span>
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Link to={`/posts/${post.postId}`}>
                                            <Calendar className="h-4 w-4" style={{ display: 'inline-block' }} />
                                            <span>{formatDate(post.scheduleDate)}</span>
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2 text-muted-foreground">
                                        <Link to={`/posts/${post.postId}`}>
                                            {/*getPostStatusBadge(post.status)*/}
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell className="text-end">
                                    <Link to={`/posts/${post.postId}`}>
                                        <Button variant="ghost" size="sm">
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </>
                    ))}
                </TableBody>
            </Table>
            <Pagination 
                pageNum={props.searchResult?.pageNum}
                pageCount={props.searchResult?.pageCount}
                changePage={(pageNum) => props.changePage(pageNum)}
            />
        </>
    );
}
