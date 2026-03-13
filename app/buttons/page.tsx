import { Button } from "@/components/ui/button";

const ButtonsPage = () => {
    return(
        <div className="p-4 space-y-4 flex flex-col max-w-50">
            <Button>Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="primaryOutline">Primary Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondaryOutline">Secondary Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="dangerOutline">Danger Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="sidebar">Sidebar</Button>
            <Button variant="sidebarOutline">Sidebar Outline</Button>
            <Button variant="green">Green</Button>
            <Button variant="premium">premium</Button>
            <Button variant="premiumOutline">premium Outline</Button>
        </div>
    );
};

export default ButtonsPage;