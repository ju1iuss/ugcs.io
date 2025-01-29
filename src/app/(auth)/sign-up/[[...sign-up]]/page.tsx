import { SignUp } from '@clerk/nextjs'
import AuthLayout from '@/components/global/auth/AuthLayout'
import Link from 'next/link'

const Page = () => {
  return (
    <AuthLayout 
      title="Konto erstellen"
      subtitle={
        <p>
          Bereits registriert?{' '}
          <Link href="/sign-in" className="text-purple-600 hover:text-purple-500">
            Jetzt einloggen
          </Link>
        </p>
      }
    >
      <SignUp />
    </AuthLayout>
  )
}

export default Page