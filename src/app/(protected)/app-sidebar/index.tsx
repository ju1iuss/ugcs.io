import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Crown, Link } from "lucide-react";
import { useUser } from '@clerk/nextjs';

const { user } = useUser();

const getUpgradeButton = (plan: string) => {
  switch(plan) {
    case 'agency':
      return (
        <DropdownMenuItem className="flex items-center gap-2 py-2.5 text-gray-500">
          <Crown className="h-4 w-4 text-yellow-500" />
          <span className="text-sm">Agency Plan (Höchstes Tier)</span>
        </DropdownMenuItem>
      );
    case 'creator':
      return (
        <Link href="/pricing">
          <DropdownMenuItem className="flex items-center gap-2 py-2.5">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Upgrade to Agency
            </span>
          </DropdownMenuItem>
        </Link>
      );
    case 'starter':
      return (
        <Link href="/pricing">
          <DropdownMenuItem className="flex items-center gap-2 py-2.5">
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Upgrade to Creator
            </span>
          </DropdownMenuItem>
        </Link>
      );
    default: // 'free' or undefined
      return (
        <Link href="/pricing">
          <DropdownMenuItem className="flex items-center gap-2 py-2.5">
            <div className="w-full px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md text-center">
              <span className="text-sm font-medium">Auf Pro upgraden</span>
            </div>
          </DropdownMenuItem>
        </Link>
      );
  }
};

<DropdownMenuContent 
  align="end" 
  alignOffset={-14}
  className="w-56"
  sideOffset={8}
>
  {getUpgradeButton(user?.publicMetadata?.plan as string)}
  <a 
    href="https://billing.stripe.com/p/login/eVaaEF8mH2uz2l2288" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <DropdownMenuItem className="flex items-center gap-2 py-2.5">
      <span className="text-sm">Abrechnung</span>
    </DropdownMenuItem>
  </a>
</DropdownMenuContent> 