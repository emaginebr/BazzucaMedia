import { getNetworkIcon, getNetworkName } from "@/components/functions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ClientInfo from "@/DTO/Domain/ClientInfo";
import SocialNetworkInfo from "@/DTO/Domain/SocialNetworkInfo";
import { Calendar, Download, Edit, Edit2, Eye, Network, Pencil, Trash, User } from "lucide-react";

interface INetworkProps {
    loading: boolean;
    networks?: SocialNetworkInfo[];
    onEdit: (network: SocialNetworkInfo) => void;
    onDelete: (network: SocialNetworkInfo) => void;
}

export default function NetworkTable(props: INetworkProps) {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Social Network</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Url</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    props.loading && [1, 2, 3, 4, 5].map((index) => {
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
                                <TableCell className="text-end">
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
                {!props.loading && props.networks?.length === 0 && (
                    <TableRow key={0} className="cursor-pointer hover:bg-muted/50">
                        <TableCell colSpan={4} className="text-center">
                            No Social Networks found.
                        </TableCell>
                    </TableRow>
                )}
                {!props.loading && props.networks.map((network) => (
                    <>
                        <TableRow key={network.networkId} className="cursor-pointer hover:bg-muted/50">
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    {/*getNetworkIcon(network.network)*/}
                                    <span>{getNetworkName(network.network)}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>{network.user}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2 text-muted-foreground">
                                    <Download className="h-4 w-4" />
                                    <span>{network.url}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-end">
                                <Button variant="ghost" size="sm" onClick={async (e) => {
                                    e.preventDefault();
                                    props.onEdit(network);
                                }}>
                                    <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={async (e) => {
                                    e.preventDefault();
                                    props.onDelete(network);
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
