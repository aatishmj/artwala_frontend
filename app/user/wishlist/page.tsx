import { redirect } from 'next/navigation'

export default function WishlistLegacyRedirect() {
  redirect('/user/saved')
}
