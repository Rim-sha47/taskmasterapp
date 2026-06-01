import logoUrl from '../../assets/logo.png';

export default function Logo({ className = 'h-10 w-auto' }) {
  return <img src={logoUrl} alt="TaskMaster Logo" className={className} />;
}
