import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Subir Archivos",
  description: "Sube y gestiona tus archivos industriales de forma segura.",
  alternates: {
    canonical: "/upload",
  },
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
