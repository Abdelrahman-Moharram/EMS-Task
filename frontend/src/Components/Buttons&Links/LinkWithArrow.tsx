import { Link } from 'react-router-dom'

interface Props{
    href: string;
    text:string;
}

const LinkWithArrow = ({href, text}:Props) => {
  return (
    <Link 
        to={href} 
        className="group absolute inline-flex items-center gap-1 text-sm font-medium text-primary">
        {text}

        <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
            &rarr;
        </span>
    </Link>
  )
}

export default LinkWithArrow
