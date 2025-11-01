import { useEffect, useState } from 'react';
import { supabase, Profile, Purchase, Account, Message } from '../lib/supabase';
import DashboardLayout from './DashboardLayout';
import { Package, Star, TrendingUp, MessageSquare, Clock } from 'lucide-react';

interface UserDashboardProps {
  profile: Profile;
  onLogout: () => void;
}

export default function UserDashboard({ profile, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [purchases, setPurchases] = useState<(Purchase & { accounts: Account })[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [profile.id]);

  const loadData = async () => {
    setLoading(true);

    const { data: purchasesData } = await supabase
      .from('purchases')
      .select('*, accounts(*)')
      .eq('buyer_id', profile.id)
      .order('purchase_date', { ascending: false });

    if (purchasesData) {
      setPurchases(purchasesData as (Purchase & { accounts: Account })[]);
    }

    const { data: messagesData } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${profile.id},recipient_id.eq.${profile.id}`)
      .order('created_at', { ascending: false })
      .limit(10);

    if (messagesData) {
      setMessages(messagesData);
    }

    setLoading(false);
  };

  const renderOverview = () => {
    const pendingDeliveries = purchases.filter(p => p.delivery_status === 'pending').length;
    const completedPurchases = purchases.filter(p => p.delivery_status === 'completed').length;
    const unreadMessages = messages.filter(m => m.recipient_id === profile.id && !m.read).length;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile.full_name || 'User'}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your accounts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Purchases</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{purchases.length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Deliveries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingDeliveries}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Unread Messages</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{unreadMessages}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Purchases</h2>
          {purchases.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No purchases yet. Browse the marketplace to get started!</p>
          ) : (
            <div className="space-y-4">
              {purchases.slice(0, 5).map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200 rounded-lg w-16 h-16 flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{purchase.accounts.title}</h3>
                      <p className="text-sm text-gray-600">{purchase.accounts.game}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Purchased: {new Date(purchase.purchase_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${purchase.accounts.price}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      purchase.delivery_status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : purchase.delivery_status === 'delivered'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {purchase.delivery_status.charAt(0).toUpperCase() + purchase.delivery_status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPurchases = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Accounts</h1>
          <p className="text-gray-600 mt-1">Manage and access your purchased accounts</p>
        </div>

        {purchases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Accounts Yet</h3>
            <p className="text-gray-600">Start browsing the marketplace to purchase your first account!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchases.map((purchase) => (
              <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{purchase.accounts.title}</h3>
                    <p className="text-sm text-gray-600">{purchase.accounts.game}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    purchase.delivery_status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : purchase.delivery_status === 'delivered'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {purchase.delivery_status.charAt(0).toUpperCase() + purchase.delivery_status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Level</p>
                    <p className="font-semibold text-gray-900">{purchase.accounts.level}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Wins</p>
                    <p className="font-semibold text-gray-900">{purchase.accounts.wins}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <p className="font-semibold text-gray-900">{purchase.accounts.rating}</p>
                    </div>
                  </div>
                </div>

                {purchase.delivery_status === 'delivered' || purchase.delivery_status === 'completed' ? (
                  <div className="bg-gray-50 rounded p-4 mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Account Details</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="font-medium">Username:</span> {(purchase.account_details as { username?: string })?.username || 'N/A'}</p>
                      <p><span className="font-medium">Password:</span> {(purchase.account_details as { password?: string })?.password || 'N/A'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 rounded p-4 mb-4">
                    <p className="text-sm text-yellow-700">Delivery is being processed. You'll receive account details soon.</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                    Contact Support
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderMessages = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communication with support and sellers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {messages.length === 0 ? (
            <div className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages</h3>
              <p className="text-gray-600">Your conversations will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {messages.map((message) => (
                <div key={message.id} className={`p-6 ${!message.read && message.recipient_id === profile.id ? 'bg-blue-50' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-gray-900">
                      {message.sender_id === profile.id ? 'You' : 'Support'}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(message.created_at).toLocaleString()}</p>
                  </div>
                  <p className="text-gray-700">{message.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isAdmin={false}
      onLogout={onLogout}
    >
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'purchases' && renderPurchases()}
      {activeTab === 'messages' && renderMessages()}
    </DashboardLayout>
  );
}
