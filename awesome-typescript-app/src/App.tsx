interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.name}</h1>;
}

interface ContentProps {
  courses: object[];
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courses.map((c, i) => (
        <p key={i}>{c.name} {c.exerciseCount}</p>
      ))}
    </div>
  )
}

interface TotalProps {
  total: number;
}

const Total = (props: TotalProps) => {
  return (
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  )
}


const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;