//customizable 404 page if don't want to go with the default page
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Hi there ! 404- not found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}