import PostStatusEnum from "@/DTO/Enum/PostStatusEnum";
import SocialNetworkEnum from "@/DTO/Enum/SocialNetworkEnum";
import { Facebook, Instagram, Linkedin, LucideProps, MinusCircle, Network, X, Youtube } from "lucide-react";
import React from "react";
import { Badge } from "./ui/badge";

const TWITTER: string = "x";
const FACEBOOK: string = "facebook";
const INSTAGRAM: string = "instagram";
const LINKEDIN: string = "linkedin";
const TIKTOK: string = "tiktok";
const YOUTUBE: string = "youtube";

const socialNetworks = [
    { value: TWITTER, label: "X" },
    { value: FACEBOOK, label: "Facebook" },
    { value: INSTAGRAM, label: "Instagram" },
    { value: LINKEDIN, label: "LinkedIn" },
    { value: TIKTOK, label: "TikTok" },
    { value: YOUTUBE, label: "YouTube" },
];

function getNetworkBadge(network: SocialNetworkEnum): string {
    switch (network) {
        case SocialNetworkEnum.X:
            return 'badge-twitter';
        case SocialNetworkEnum.Facebook:
            return 'badge-facebook';
        case SocialNetworkEnum.Instagram:
            return 'badge-instagram';
        case SocialNetworkEnum.LinkedIn:
            return 'badge-linkedin';
        case SocialNetworkEnum.TikTok:
            return 'badge-tiktok';
        case SocialNetworkEnum.YouTube:
            return 'badge-youtube';
        default:
            return 'badge-unknown';
    }
}

function getNetworkName(network: SocialNetworkEnum): string {
    switch (network) {
        case SocialNetworkEnum.X:
            return 'X.com';
        case SocialNetworkEnum.Facebook:
            return 'Facebook';
        case SocialNetworkEnum.Instagram:
            return 'Instagram';
        case SocialNetworkEnum.LinkedIn:
            return 'LinkedIn';
        case SocialNetworkEnum.TikTok:
            return 'TikTok';
        case SocialNetworkEnum.YouTube:
            return 'YouTube';
        default:
            return 'Unknown Network';
    }
}

function getNetworkColor(network: SocialNetworkEnum): string {
    switch (network) {
        case SocialNetworkEnum.X:
            return '#000000';
        case SocialNetworkEnum.Facebook:
            return '#1877F2';
        case SocialNetworkEnum.Instagram:
            return '#E1306C';
        case SocialNetworkEnum.LinkedIn:
            return '#0A66C2';
        case SocialNetworkEnum.TikTok:
            return '#010101';
        case SocialNetworkEnum.YouTube:
            return '#FF0000';
        default:
            return '#000000';
    }
}

function getNetworkIcon(network: SocialNetworkEnum): React.JSX.Element {
    switch (network) {
        case SocialNetworkEnum.X:
            return <X className="h-4 w-4 mr-1" />;
        case SocialNetworkEnum.Facebook:
            return <Facebook className="h-4 w-4 mr-1" />;
        case SocialNetworkEnum.Instagram:
            return <Instagram className="h-4 w-4 mr-1" />;
        case SocialNetworkEnum.LinkedIn:
            return <Linkedin className="h-4 w-4 mr-1" />;
        case SocialNetworkEnum.TikTok:
            return <Network className="h-4 w-4 mr-1" />;
        case SocialNetworkEnum.YouTube:
            return <Youtube className="h-4 w-4 mr-1" />;
        default:
            return <MinusCircle className="h-4 w-4 mr-1" />;
    }
}

function socialNetworkToEnum(network: string): SocialNetworkEnum {
    switch (network) {
        case TWITTER:
            return SocialNetworkEnum.X;
        case FACEBOOK:
            return SocialNetworkEnum.Facebook;
        case INSTAGRAM:
            return SocialNetworkEnum.Instagram;
        case LINKEDIN:
            return SocialNetworkEnum.LinkedIn;
        case TIKTOK:
            return SocialNetworkEnum.TikTok;
        case YOUTUBE:
            return SocialNetworkEnum.YouTube;
        default:
            return SocialNetworkEnum.Unknow;
    }
}

function socialNetworkFromEnum(network: SocialNetworkEnum): string {
    switch (network) {
        case SocialNetworkEnum.X:
            return TWITTER; 
        case SocialNetworkEnum.Facebook:
            return FACEBOOK;
        case SocialNetworkEnum.Instagram:
            return INSTAGRAM;
        case SocialNetworkEnum.LinkedIn:
            return LINKEDIN;
        case SocialNetworkEnum.TikTok:
            return TIKTOK;
        case SocialNetworkEnum.YouTube:
            return YOUTUBE;
        default:
            return '';
    }
}

function getPostStatusName(status: PostStatusEnum): string {
    switch (status) {
        case PostStatusEnum.Draft:
            return 'Draft';
        case PostStatusEnum.Scheduled:
            return 'Scheduled';
        case PostStatusEnum.Posted:
            return 'Posted';
        case PostStatusEnum.Canceled:
            return 'Cancelled';
        case PostStatusEnum.ScheduredOnNetwork:
            return 'Scheduled on Network';
        default:
            return 'Unknown Status';
    }
}

function getPostStatusBadge(status: PostStatusEnum): React.JSX.Element {
    switch (status) {
        case PostStatusEnum.Draft:
            return <Badge variant="secondary" className="badge-draft">Draft</Badge>;
        case PostStatusEnum.Scheduled:
            return <Badge variant="secondary" className="badge-scheduled">Scheduled</Badge>;
        case PostStatusEnum.Posted:
            return <Badge variant="secondary" className="badge-posted">Posted</Badge>;
        case PostStatusEnum.Canceled:
            return <Badge variant="secondary" className="badge-cancelled">Cancelled</Badge>;
        case PostStatusEnum.ScheduredOnNetwork:
            return <Badge variant="secondary" className="badge-scheduled">Scheduled On Network</Badge>;
        default:
            return <Badge variant="secondary" className="bg-brand-blue/20 text-brand-blue border-brand-blue/30">Unknow</Badge>;
    }
}

export { 
    getNetworkBadge, getNetworkName, getNetworkColor, getNetworkIcon, getPostStatusBadge, 
    socialNetworkToEnum, socialNetworkFromEnum, getPostStatusName,
    socialNetworks 
};