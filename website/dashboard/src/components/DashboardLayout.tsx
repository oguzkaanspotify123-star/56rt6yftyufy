import { ReactNode } from 'react';
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, Upload, Users, LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function DashboardLayout({ children, activeTab, onTabChange, isAdmin, onLogout }: DashboardLayoutProps) {
  const userTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'purchases', label: 'My Accounts', icon: Package },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'accounts', label: 'Manage Accounts', icon: Package },
    { id: 'upload', label: 'Upload Account', icon: Upload },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const tabs = isAdmin ? adminTabs : userTabs;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-red-500 text-white px-3 py-1 rounded font-bold text-lg">F2G</div>
              <span className="ml-4 text-gray-600 text-sm">
                {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-50 text-red-500 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
