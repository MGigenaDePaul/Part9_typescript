import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  part: CoursePart;
}

const Part = ({part}: PartProps) => {
  switch(part.kind) {
    case "basic":
      console.log(part.name, part.description, part.exerciseCount);
      return (
        <div key={part.name}>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p><i>{part.description}</i></p>
        </div>);
    case "group":
      console.log(part.name, part.description, part.exerciseCount, part.groupProjectCount);
        return (
        <div key={part.name}>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p><i>{part.description}</i></p>
          <p>group project exercises {part.groupProjectCount}</p>
        </div>);
    case "background":
      console.log(part.name, part.description, part.exerciseCount ,part.backgroundMaterial);
        return (
        <div key={part.name}>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p><i>{part.description}</i></p>
          <p>Submit to {part.backgroundMaterial}</p>
        </div>);
      case "special":
        console.log(part.name, part.description, part.exerciseCount, part.requirements);
        return (
        <div key={part.name}>
          <h2>{part.name} {part.exerciseCount}</h2>
          <p><i>{part.description}</i></p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </div>);
    default:
      return assertNever(part);
  }
}

export default Part;