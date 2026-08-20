export default function Homepage() {
  return (
    <>
  <h1>Default main page</h1>
    <CreatePlantForm
      onSubmitForm={(data) => console.log(data)} /* console.log to see if data is submitted */
    />
    </>
  );
}
