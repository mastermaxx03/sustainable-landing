import './globals.css'
import { AppStateProvider } from '@/context/AppStateContext'
import { DataProvider } from '@/context/DataContext'
import { CameraProvider } from '@/context/CameraContext'

export const metadata = {
  title: 'Sustainable Fashion Supply Chain',
  description: '3D interactive visualization of global fashion supply chain emissions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppStateProvider>
          <DataProvider>
            <CameraProvider>
              {children}
            </CameraProvider>
          </DataProvider>
        </AppStateProvider>
      </body>
    </html>
  )
}
