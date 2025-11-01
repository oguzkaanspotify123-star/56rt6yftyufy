import { useEffect, useState } from 'react';
import { supabase, Profile } from './lib/supabase';
import AuthForm from './components/AuthForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [session, setSession] = useState<unknown>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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
        }
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
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

  if (profile.role === 'admin') {
    return <AdminDashboard profile={profile} onLogout={handleLogout} />;
  }

  return <UserDashboard profile={profile} onLogout={handleLogout} />;
}

export default App;
