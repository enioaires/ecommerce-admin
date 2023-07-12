import { FC } from "react";

interface headingProps {
  title: string;
  description: string;
}

const Heading: FC<headingProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
