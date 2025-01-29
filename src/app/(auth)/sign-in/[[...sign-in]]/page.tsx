import { SignIn } from '@clerk/nextjs'
import AuthLayout from '@/components/global/auth/AuthLayout'
import Link from 'next/link'

const Page = () => {
  return (
    <AuthLayout 
      title="Willkommen zurück!"
      subtitle={
        <p>
          Noch kein Konto?{' '}
          <Link href="/sign-up" className="text-purple-600 hover:text-purple-500">
            Jetzt registrieren
          </Link>
        </p>
      }
    >
      <SignIn />
    </AuthLayout>
  )
}

export default Page