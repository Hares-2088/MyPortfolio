export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Project {params.id}</h1>
      <p>This is the project details page.</p>
    </div>
  );
}