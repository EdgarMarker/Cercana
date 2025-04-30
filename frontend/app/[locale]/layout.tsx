
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({ children, params }: Props) {

  return (
    <div>{children}</div>
  );
}