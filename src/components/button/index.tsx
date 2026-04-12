import { ArrowUpRight } from "lucide-react";
import "./style.scss";

interface Props {
  href: string;
  text: string;
  blank?: boolean;
}
const Button = ({ href, text, blank }: Props) => {
  return (
    <a target={blank ? "_blank" : "_self"} className="button-link" href={href}>
      {text}
      <ArrowUpRight strokeWidth={2.3} size={18} />
    </a>
  );
};
export default Button;
