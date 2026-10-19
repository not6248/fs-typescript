interface CoursePartBase {
  name: string
  exerciseCount: number
}

interface CoursePartBaseDes extends CoursePartBase {
  description: string
}

interface CoursePartBasic extends CoursePartBaseDes {
  kind: 'basic'
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number
  kind: 'group'
}

interface CoursePartBackground extends CoursePartBaseDes {
  backgroundMaterial: string
  kind: 'background'
}

interface CoursePartSpecial extends CoursePartBaseDes {
  requirements: string[]
  kind: 'special'
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
    kind: 'basic',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: 'group',
  },
  {
    name: 'Basics of type Narrowing',
    exerciseCount: 7,
    description: 'How to go from unknown to string',
    kind: 'basic',
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    backgroundMaterial:
      'https://type-level-typescript.com/template-literal-types',
    kind: 'background',
  },
  {
    name: 'TypeScript in frontend',
    exerciseCount: 10,
    description: 'a hard part',
    kind: 'basic',
  },
  {
    name: 'Backend development',
    exerciseCount: 21,
    description: 'Typing the backend',
    requirements: ['nodejs', 'jest'],
    kind: 'special',
  },
]

interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => <h1>{props.name}</h1>

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((p) => (
        <Part part={p} />
      ))}
    </div>
  )
}

interface TotalProps {
  total: number
}

const Total = ({ total }: TotalProps) => <p>Number of exercises {total}</p>

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  )
}

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
        </p>
      )
      break
    case 'group':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>project exercises {part.groupProjectCount}</div>
        </p>
      )
      break
    case 'background':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>submit to {part.backgroundMaterial}</div>
        </p>
      )
      break
    case 'special':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount} {part.kind}
          </b>
          <div>
            <i>{part.description}</i>
          </div>
          <div>required skills: {part.requirements.join(',')}</div>
        </p>
      )
      break
    default:
      return assertNever(part)
  }
}

const App = () => {
  const courseName = 'Half Stack application development'

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0,
  )

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  )
}

export default App
