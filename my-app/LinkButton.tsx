import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkButtonProps {
  classname: string;
  pageRoute: string;
  children: ReactNode;
}

export default function LinkButton({ pageRoute, children, classname = '' }: LinkButtonProps) {
  return <Link className={classname} href={pageRoute}>{children}</Link>;
}