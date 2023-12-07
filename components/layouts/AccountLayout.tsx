import { Loading, Navbar, Sidebar } from '@/components/shared';
import { User } from '@prisma/client';
import useCollapse from 'hooks/useCollapse';
import { useSession } from 'next-auth/react';
import React, { ElementRef, MouseEventHandler, useRef } from 'react';

interface AccountLayoutProps {
  props: { user?: User };
  children: React.ReactNode;
}

export default function AccountLayout({ children, props }: AccountLayoutProps) {
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const [collapse, setCollapse] = useCollapse(sidebarRef, 'dashboard-wrapper');

  const { status } = useSession();

  const toggleSidebar: MouseEventHandler<HTMLButtonElement> = () => {
    setCollapse((prev) => !prev);
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <div id="dashboard-wrapper" className="flex overflow-hidden h-full">
        <Sidebar isCollapsed={collapse} ref={sidebarRef} user={props?.user} />
        <div className="relative h-full w-full overflow-y-auto lg:ml-64">
          <main>
            <div className="flex h-screen w-full justify-center">
              <div className={`lg:w-full md:w-full sm:w-full ${!collapse && 'md:w-3/6 sm:w-3/5'} px-6 py-6`}>{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
