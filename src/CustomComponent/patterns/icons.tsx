import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const YarnBall = (props: IconProps) => (
  <svg viewBox="0 0 36 36" fill="none" {...props}>
    <circle cx="18" cy="18" r="11" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9 12 Q18 8 27 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const CrochetHook = (props: IconProps) => (
  <svg viewBox="0 0 36 36" fill="none" {...props}>
    <line
      x1="28"
      y1="4"
      x2="10"
      y2="28"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const Sweater = (props: IconProps) => (
  <svg viewBox="0 0 36 36" fill="none" {...props}>
    <path
      d="M4 14 L10 8 Q13 6 14 10 L14 30 L22 30 L22 10 Q23 6 26 8 L32 14"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export const icons = {
  yarnBall: YarnBall,
  crochetHook: CrochetHook,
  sweater: Sweater,
  // add the rest here...
};

export type IconName = keyof typeof icons;

interface AppIconProps extends IconProps {
  name: IconName;
}

export const AppIcon = ({ name, ...props }: AppIconProps) => {
  const Icon = icons[name];

  if (!Icon) return null;

  return <Icon {...props} />;
};