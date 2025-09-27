import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Messages",
  description: "Send and receive messages with artists and buyers",
}

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-gray-50">
      {children}
    </section>
  )
}
