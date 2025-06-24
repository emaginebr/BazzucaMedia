import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ClientInfo from "@/DTO/Domain/ClientInfo";
import { Calendar, Edit, Edit2, Eye, Network, Pencil, Trash, User } from "lucide-react";
import { Link } from "react-router-dom";

interface IClientProps {
    loading: boolean;
    clients?: ClientInfo[];
    onEdit: (client: ClientInfo) => void;
    onDelete: (client: ClientInfo) => void;
}

export default function ClientTable(props: IClientProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Social Networks</TableHead>
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
                                <TableCell align="right">
                                    <Button variant="ghost" size="sm" disabled={true}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" disabled={true}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                }
                {!props.loading && props.clients?.length === 0 && (
                    <TableRow key={0} className="cursor-pointer hover:bg-muted/50">
                        <TableCell colSpan={3} className="text-center">
                            No clients found.
                        </TableCell>
                    </TableRow>
                )}
                {!props.loading && props.clients.map((client) => (
                    <>
                        <TableRow key={client.clientId} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <Link to={`/clients/${client.clientId}`}>
                                        <User className="h-4 w-4" style={{ display: 'inline-block' }} />
                                        <span>{client.name}</span>
                                    </Link>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                                <Link to={`/clients/${client.clientId}`}>
                                    <span>{client.socialNetworks}</span>
                                </Link>
                            </TableCell>
                            <TableCell className="text-end">
                                <Button variant="ghost" size="sm" onClick={async (e) => {
                                    e.preventDefault();
                                    props.onEdit(client);
                                }}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={async (e) => {
                                    e.preventDefault();
                                    props.onDelete(client);
                                }}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </>
                ))}
            </TableBody>
        </Table>
    );
}
