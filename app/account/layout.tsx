import SideNavigation from "@/components/SideNavigation";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid min-[1px]:grid-cols-[1fr] min-[1150px]:grid-cols-[1fr_4fr] grid-cols-[1fr_4fr] min-[1px]:h-auto min-[1150px]:h-full gap-12">
      <SideNavigation />

      <div>{children}</div>
    </div>
  );
}
