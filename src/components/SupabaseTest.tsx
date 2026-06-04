import { useEffect, useState } from 'react';
import { useSupabase } from '../lib/SupabaseProvider';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export function SupabaseTest() {
  const { supabase } = useSupabase();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setConnectionStatus('checking');
      setErrorMessage(null);
      
      // Simple query to test connection
      const { data, error } = await supabase.from('_dummy_query').select('*').limit(1);
      
      if (error && error.message !== 'relation "_dummy_query" does not exist') {
        throw error;
      }
      
      setConnectionStatus('connected');
    } catch (error: any) {
      setConnectionStatus('error');
      setErrorMessage(error.message || 'An unknown error occurred');
      console.error('Supabase connection error:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
        <CardDescription>Testing connection to your Supabase instance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium">Status:</div>
            <div className="flex items-center">
              {connectionStatus === 'checking' && (
                <div className="text-yellow-500">Checking connection...</div>
              )}
              {connectionStatus === 'connected' && (
                <div className="text-green-500">Connected successfully!</div>
              )}
              {connectionStatus === 'error' && (
                <div className="text-red-500">Connection error</div>
              )}
            </div>
          </div>
          
          {errorMessage && (
            <div className="text-sm text-red-500 mt-2">
              Error: {errorMessage}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={checkConnection}
          disabled={connectionStatus === 'checking'}
        >
          Test Connection
        </Button>
      </CardFooter>
    </Card>
  );
}