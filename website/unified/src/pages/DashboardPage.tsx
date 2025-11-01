import { useEffect, useState } from 'react';
import { supabase, Profile, Purchase, Account } from '../lib/supabase';
import AuthForm from '../components/AuthForm';
import DashboardLayout from '../components/DashboardLayout';
import { Package, DollarSign, TrendingUp, Clock, MessageSquare, Star, Upload, X, Check } from 'lucide-react';

export default function DashboardPage() {
  const [session, setSession] = useState<unknown>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [purchases, setPurchases] = useState<(Purchase & { accounts: Account })[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [allPurchases, setAllPurchases] = useState<(Purchase & { accounts: Account; profiles: Profile })[]>([]);
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        loadProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        if (session) {
          await loadProfile(session.user.id);
        } else {
          setProfile(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadProfile = async (userId: string) => {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (existingProfile) {
      setProfile(existingProfile);
      await loadData(userId, existingProfile.role);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const newProfile = {
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || null,
          role: 'user' as const,
          created_at: new Date().toISOString(),
        };

        const { error } = await supabase
          .from('profiles')
          .insert([newProfile]);

        if (!error) {
          setProfile(newProfile);
          await loadData(userId, 'user');
        }
      }
    }
    setLoading(false);
  };

  const loadData = async (userId: string, role: string) => {
    if (role === 'admin') {
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
        setAllPurchases(purchasesData as (Purchase & { accounts: Account; profiles: Profile })[]);
      }
    } else {
      const { data: purchasesData } = await supabase
        .from('purchases')
        .select('*, accounts(*)')
        .eq('buyer_id', userId)
        .order('purchase_date', { ascending: false });

      if (purchasesData) {
        setPurchases(purchasesData as (Purchase & { accounts: Account })[]);
      }
    }
  };

  const handleUploadAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

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
      loadData(profile.id, profile.role);
      setActiveTab('accounts');
    }
  };

  const updateDeliveryStatus = async (purchaseId: string, status: 'pending' | 'delivered' | 'completed') => {
    await supabase
      .from('purchases')
      .update({ delivery_status: status })
      .eq('id', purchaseId);

    if (profile) {
      loadData(profile.id, profile.role);
    }
  };

  const updateAccountStatus = async (accountId: string, status: 'available' | 'sold' | 'reserved') => {
    await supabase
      .from('accounts')
      .update({ status })
      .eq('id', accountId);

    if (profile) {
      loadData(profile.id, profile.role);
    }
  };

  const deleteAccount = async (accountId: string) => {
    await supabase
      .from('accounts')
      .delete()
      .eq('id', accountId);

    if (profile) {
      loadData(profile.id, profile.role);
    }
  };

  const renderUserOverview = () => {
    const pendingDeliveries = purchases.filter(p => p.delivery_status === 'pending').length;

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {profile?.full_name || 'User'}!</h1>
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
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
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

  const renderUserPurchases = () => {
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

                <button className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                  Contact Support
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAdminOverview = () => {
    const totalRevenue = allPurchases.reduce((sum, p) => sum + Number(p.accounts.price), 0);
    const pendingOrders = allPurchases.filter(p => p.delivery_status === 'pending').length;
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
                {allPurchases.slice(0, 10).map((purchase) => (
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

  const renderAdminAccounts = () => {
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

  const renderAdminUpload = () => {
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

  const renderAdminOrders = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-1">Process and deliver customer orders</p>
        </div>

        <div className="space-y-4">
          {allPurchases.map((purchase) => (
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

  const renderMessages = () => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communication with support and customers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages</h3>
          <p className="text-gray-600">Your conversations will appear here</p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !profile) {
    return <AuthForm onAuthSuccess={() => {}} />;
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      isAdmin={profile.role === 'admin'}
    >
      {profile.role === 'admin' ? (
        <>
          {activeTab === 'overview' && renderAdminOverview()}
          {activeTab === 'accounts' && renderAdminAccounts()}
          {activeTab === 'upload' && renderAdminUpload()}
          {activeTab === 'orders' && renderAdminOrders()}
          {activeTab === 'messages' && renderMessages()}
        </>
      ) : (
        <>
          {activeTab === 'overview' && renderUserOverview()}
          {activeTab === 'purchases' && renderUserPurchases()}
          {activeTab === 'messages' && renderMessages()}
        </>
      )}
    </DashboardLayout>
  );
}
