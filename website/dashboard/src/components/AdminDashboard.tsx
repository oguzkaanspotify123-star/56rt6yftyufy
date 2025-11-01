import { useEffect, useState } from 'react';
import { supabase, Profile, Purchase, Account, Message } from '../lib/supabase';
import DashboardLayout from './DashboardLayout';
import { Package, DollarSign, Users, TrendingUp, Upload, X, Check } from 'lucide-react';

interface AdminDashboardProps {
  profile: Profile;
  onLogout: () => void;
}

export default function AdminDashboard({ profile, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [purchases, setPurchases] = useState<(Purchase & { accounts: Account; profiles: Profile })[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    game: '',
    price: '',
    level: '',
    rank: '',
    wins: '',
    rating: '',
    description: '',
    status: 'available' as const,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    const { data: accountsData } = await supabase
      .from('accounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (accountsData) {
      setAccounts(accountsData);
    }

    const { data: purchasesData } = await supabase
      .from('purchases')
      .select('*, accounts(*), profiles(*)')
      .order('purchase_date', { ascending: false });

    if (purchasesData) {
      setPurchases(purchasesData as (Purchase & { accounts: Account; profiles: Profile })[]);
    }

    setLoading(false);
  };

  const handleUploadAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from('accounts').insert({
      title: uploadForm.title,
      game: uploadForm.game,
      price: parseFloat(uploadForm.price),
      level: parseInt(uploadForm.level) || 0,
      rank: uploadForm.rank || null,
      wins: parseInt(uploadForm.wins) || 0,
      rating: parseFloat(uploadForm.rating) || 0,
      description: uploadForm.description || null,
      status: uploadForm.status,
      seller_id: profile.id,
    });

    if (!error) {
      setUploadForm({
        title: '',
        game: '',
        price: '',
        level: '',
        rank: '',
        wins: '',
        rating: '',
        description: '',
        status: 'available',
      });
      loadData();
      setActiveTab('accounts');
    }
  };

  const updateDeliveryStatus = async (purchaseId: string, status: 'pending' | 'delivered' | 'completed') => {
    await supabase
      .from('purchases')
      .update({ delivery_status: status })
      .eq('id', purchaseId);

    loadData();
  };

  const updateAccountStatus = async (accountId: string, status: 'available' | 'sold' | 'reserved') => {
    await supabase
      .from('accounts')
      .update({ status })
      .eq('id', accountId);

    loadData();
  };

  const deleteAccount = async (accountId: string) => {
    await supabase
      .from('accounts')
      .delete()
      .eq('id', accountId);

    loadData();
  };

  const renderOverview = () => {
    const totalRevenue = purchases.reduce((sum, p) => sum + Number(p.accounts.price), 0);
    const pendingOrders = purchases.filter(p => p.delivery_status === 'pending').length;
    const availableAccounts = accounts.filter(a => a.status === 'available').length;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-600 mt-1">Manage your marketplace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${totalRevenue.toFixed(0)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Accounts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{accounts.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingOrders}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Available</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{availableAccounts}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Account</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {purchases.slice(0, 10).map((purchase) => (
                  <tr key={purchase.id} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-900">{purchase.profiles.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{purchase.accounts.title}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">${purchase.accounts.price}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        purchase.delivery_status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : purchase.delivery_status === 'delivered'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {purchase.delivery_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(purchase.purchase_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAccounts = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Accounts</h1>
          <p className="text-gray-600 mt-1">View and manage all marketplace accounts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{account.title}</h3>
                  <p className="text-sm text-gray-600">{account.game}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  account.status === 'available'
                    ? 'bg-green-100 text-green-700'
                    : account.status === 'sold'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {account.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-semibold text-gray-900">${account.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Level:</span>
                  <span className="text-gray-900">{account.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wins:</span>
                  <span className="text-gray-900">{account.wins}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={account.status}
                  onChange={(e) => updateAccountStatus(account.id, e.target.value as any)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
                <button
                  onClick={() => deleteAccount(account.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUpload = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload New Account</h1>
          <p className="text-gray-600 mt-1">Add a new account to the marketplace</p>
        </div>

        <form onSubmit={handleUploadAccount} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Epic Account"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Game</label>
                <input
                  type="text"
                  required
                  value={uploadForm.game}
                  onChange={(e) => setUploadForm({ ...uploadForm, game: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Fortnite"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={uploadForm.price}
                  onChange={(e) => setUploadForm({ ...uploadForm, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="199"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <input
                  type="number"
                  value={uploadForm.level}
                  onChange={(e) => setUploadForm({ ...uploadForm, level: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rank</label>
                <input
                  type="text"
                  value={uploadForm.rank}
                  onChange={(e) => setUploadForm({ ...uploadForm, rank: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Diamond"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Wins</label>
                <input
                  type="number"
                  value={uploadForm.wins}
                  onChange={(e) => setUploadForm({ ...uploadForm, wins: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  value={uploadForm.rating}
                  onChange={(e) => setUploadForm({ ...uploadForm, rating: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="4.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Account description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={uploadForm.status}
                onChange={(e) => setUploadForm({ ...uploadForm, status: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Account
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderOrders = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Process and deliver customer orders</p>
        </div>

        <div className="space-y-4">
          {purchases.map((purchase) => (
            <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{purchase.accounts.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Customer: {purchase.profiles.email}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Order Date: {new Date(purchase.purchase_date).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${purchase.accounts.price}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                    purchase.delivery_status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : purchase.delivery_status === 'delivered'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {purchase.delivery_status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
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
                  <p className="font-semibold text-gray-900">{purchase.accounts.rating}</p>
                </div>
              </div>

              <div className="flex gap-3">
                {purchase.delivery_status === 'pending' && (
                  <button
                    onClick={() => updateDeliveryStatus(purchase.id, 'delivered')}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Mark as Delivered
                  </button>
                )}
                {purchase.delivery_status === 'delivered' && (
                  <button
                    onClick={() => updateDeliveryStatus(purchase.id, 'completed')}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Mark as Completed
                  </button>
                )}
                {purchase.delivery_status === 'completed' && (
                  <div className="flex-1 bg-green-100 text-green-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    Order Completed
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomers = () => {
    const uniqueCustomers = Array.from(
      new Map(purchases.map(p => [p.profiles.id, p.profiles])).values()
    );

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">View and manage customer information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Total Purchases</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Total Spent</th>
                <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {uniqueCustomers.map((customer) => {
                const customerPurchases = purchases.filter(p => p.buyer_id === customer.id);
                const totalSpent = customerPurchases.reduce((sum, p) => sum + Number(p.accounts.price), 0);

                return (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-red-500" />
                        </div>
                        <span className="font-medium text-gray-900">{customer.full_name || 'User'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{customer.email}</td>
                    <td className="py-4 px-6 text-gray-900">{customerPurchases.length}</td>
                    <td className="py-4 px-6 font-semibold text-gray-900">${totalSpent.toFixed(2)}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(customer.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Messages</h1>
          <p className="text-gray-600 mt-1">Communicate with customers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Messaging System</h3>
          <p className="text-gray-600">Customer messaging interface would be implemented here</p>
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
      isAdmin={true}
      onLogout={onLogout}
    >
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'accounts' && renderAccounts()}
      {activeTab === 'upload' && renderUpload()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'customers' && renderCustomers()}
      {activeTab === 'messages' && renderMessages()}
    </DashboardLayout>
  );
}
