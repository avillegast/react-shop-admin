import { AuthProvider } from '@hooks/useAuth';
import MainLayout from '@layout/MainLayout';
import '@styles/tailwind.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthProvider>
    </>
  );
}
