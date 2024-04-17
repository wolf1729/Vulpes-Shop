import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem, CDBSidebarFooter } from 'cdbreact';

const Background = () => {
  return (
    <>
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar>
            <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Vulpes Shop</CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <CDBSidebarMenuItem icon="th-large">Products</CDBSidebarMenuItem>
                    <CDBSidebarMenuItem icon="sticky-note">Cart</CDBSidebarMenuItem>
                </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div className="sidebar-btn-wrapper" style={{padding: '20px 5px'}}>Log Out</div>
            </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    </>
  );
};

export default Background;