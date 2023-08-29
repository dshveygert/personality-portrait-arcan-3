import './globals.css'

export const metadata = {
    title: 'Расчет психологического портрета личности по дате рождения',
    description: 'Расчет психологического портрета личности на основе арканов по дате рождения',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    )
}
